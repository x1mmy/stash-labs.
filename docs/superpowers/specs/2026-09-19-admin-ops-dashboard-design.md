# Stash Labs Ops — `/admin` design

Date: 2026-09-19
Status: approved, ready for implementation plan

## Goal

An internal ops dashboard at `/admin`, behind an email + password login, that
reports Stash Labs finances and clients from the live Stripe account. Design is
already done (`Stash Labs Ops.dc.html`); this spec covers how it gets built and,
more importantly, which of its panels have a real data source.

## Scope

In:

- Email + password login gating every `/admin` route.
- Overview, Clients (list + detail), Subscriptions and Ledger screens.
- All figures derived from the Stripe API, read-only, server-side.

Out (deferred to the Neon database, not built here):

- Per-client contacts, activity feed and internal notes. These render as empty
  states inside the real layout — never as fabricated people or notes.
- Non-Stripe expenses: AWS, payroll, rent, contractor transfers.
- Any write path. The dashboard reads; it never mutates Stripe.

## Approach

Each `/admin` page is a server component that calls Stripe during render, with
`export const revalidate = 300`. No sync job, no webhooks, no cache store, no
client data layer. At roughly five Stripe calls per page against a 100 req/s
limit, nothing here needs a queue.

Two alternatives were considered and rejected. Route handlers with client-side
fetching would add a data layer and loading states to data that is neither
interactive nor real-time. A cron-synced snapshot in Blob or Edge Config is the
right answer once Stripe is slow or rate-limited, which it is not at this
volume.

`stripe` is the only dependency this work adds.

## Authentication

No auth library. Three environment variables:

| Variable | Purpose |
| --- | --- |
| `ADMIN_EMAIL` | The single shared login address. |
| `ADMIN_PASSWORD_HASH` | PBKDF2-SHA256, stored as `salt$hash`. |
| `ADMIN_SESSION_SECRET` | HMAC key for the session cookie. |

Flow:

1. `/admin/login` posts to a Server Action.
2. The action compares the email in constant time and verifies the password
   against `ADMIN_PASSWORD_HASH` with PBKDF2-SHA256 (210,000 iterations).
3. On success it sets cookie `sl_admin` — HttpOnly, Secure, SameSite=Lax, 7-day
   expiry — whose value is `<expiry>.<HMAC-SHA256(expiry, secret)>`.
4. `middleware.ts` matches `/admin/:path*`, skips `/admin/login`, and verifies
   the HMAC and expiry. Anything else redirects to the login page.
5. A logout Server Action clears the cookie.

All crypto uses **Web Crypto** (`crypto.subtle`), not `node:crypto`, so the same
helpers run in middleware's edge runtime and in Server Actions without a runtime
directive.

`scripts/hash-password.mjs` generates a hash to paste into the Vercel
environment. It is a one-off developer tool, never imported by the app.

Login attempts are throttled by an in-memory per-IP counter. This is
per-instance on serverless and therefore leaky; it carries a `ponytail:` comment
naming that ceiling and pointing at Neon or Upstash as the upgrade.

`app/robots.ts` gains `disallow: '/admin'`.

## Routes

The mockup switches screens with client state. These become real routes so URLs
are shareable and each page caches independently.

```
app/admin/login/page.tsx           login form
app/admin/layout.tsx               sidebar shell + auth-dependent chrome
app/admin/page.tsx                 Overview
app/admin/clients/page.tsx         Clients list
app/admin/clients/[id]/page.tsx    Client detail
app/admin/subscriptions/page.tsx   Subscriptions
app/admin/ledger/page.tsx          Ledger
```

`app/admin/layout.tsx` renders the sidebar with `next/link` nav and an active
state driven by `usePathname`. The mockup's sidebar theme toggle is **deleted**:
the root layout already renders a global `ThemeToggle` and sets `data-theme` on
`<html>` before paint, and the Tailwind config already exposes the exact token
set the mockup uses. The admin screens inherit theming with no new code.

The one token the mockup uses that Tailwind does not yet expose is `--lc` (the
green status dot). It gets added to `tailwind.config.ts` alongside `tt`.

## Data layer

`lib/admin/stripe.ts` holds one exported function per panel. Every amount is
formatted with `Intl.NumberFormat('en-AU', { currency })` using the currency
Stripe reports, not a hardcoded AUD.

MRR normalisation, used everywhere a monthly figure appears:

```
monthly = unit_amount / 100 * quantity * factor
  factor, by price.recurring.interval and interval_count n:
    month → 1 / n
    year  → 1 / (12n)
    week  → 52 / (12n)
    day   → 365 / (12n)
```

### What each panel is backed by

| Panel | Stripe source | Status |
| --- | --- | --- |
| Balance, available / pending, next payout | `balance.retrieve`, `payouts.list` | real |
| MRR; active, trialing, churned-90d counts | `subscriptions.list` | real |
| Collected / Outstanding month-to-date | `invoices.list` | real |
| Revenue by product | subscription items → product | real |
| Clients list: name, products, seats, MRR, status | `customers.list` + `subscriptions.list` | real |
| Client detail: MRR, lifetime revenue, since, renews | `customers`, `subscriptions`, `invoices` | real |
| Products and seats on client detail | subscription items, `quantity` | real |
| Plan changes feed | `events.list` | real |
| Ledger, including the money-in / money-out filter | `balance_transactions.list` | real |
| Trailing-12 chart | `invoices.list`, bucketed by `status_transitions.paid_at` | relabelled |
| Client contacts, activity, internal note | none | empty state |
| AWS, payroll, rent, contractors | none | omitted |

### Deliberate departures from the mockup

**The trailing-12 chart is Revenue, not MRR.** Stripe exposes no MRR history.
The chart is built from paid invoices per month and its label changes to
"Revenue · trailing 12" accordingly.

**"Month to date" changes rows.** The mockup shows Collected, Outstanding,
Expenses, Net. Expenses have no source, so the rows become Collected,
Outstanding, Stripe fees, Net collected — four figures that can each be
defended.

**The money-out half of the Ledger is real, but narrower than it looks.**
`balance_transactions` covers charges in, and fees, refunds and payouts out.
It does not cover money that never touched Stripe, so payroll and hosting are
absent. The All / Money in / Money out filter still works and is kept.

**Client status is derived, and "At risk" is dropped.** Stripe cannot see seat
usage, which is what the mockup's "At risk" meant. The mapping is: `past_due`
or `unpaid` → Overdue; `trialing` → Trial; `active` and created within 90 days
→ New; `active` with `cancel_at_period_end` → Renewal; `active` → Active;
`canceled` → Churned.

**"Needs attention" loses its usage row** for the same reason. It lists overdue
invoices and subscriptions renewing within 30 days.

**Lifetime revenue** is the sum of that customer's paid invoices.

List calls are paginated with a hard cap of 200 records, carrying a `ponytail:`
comment — the studio has single-digit clients today, and the cap is the thing to
raise when that stops being true.

## Manual figures

None. Runway and its `lib/admin/ops-config.ts` inputs (`OPS_CASH_ON_HAND`,
`OPS_AVG_MONTHLY_BURN`) were removed: every figure on these screens now comes
from Stripe, so there is nothing to keep up to date by hand.

## Environment

| Variable | Notes |
| --- | --- |
| `STRIPE_SECRET_KEY` | Server-only. A **restricted** read-only key is sufficient and preferred. |
| `ADMIN_EMAIL` | |
| `ADMIN_PASSWORD_HASH` | From `scripts/hash-password.mjs`. |
| `ADMIN_SESSION_SECRET` | 32+ random bytes. |

The Stripe publishable key is not used. This dashboard only reads Stripe
server-side; no Stripe code reaches the browser. It can sit in the environment
harmlessly, but nothing here consumes it.

`.env.example` is added documenting all of the above. `.gitignore` already
covers `.env*.local`.

## Testing

One check, `test/admin.test.mjs`, run with `node --test`. No framework, no
fixtures. It covers the two places where a silent bug is expensive:

- **Crypto** — PBKDF2 hash/verify roundtrip; a wrong password rejected; a valid
  session token accepted; an expired token rejected; a tampered token rejected.
- **Money** — MRR normalisation for monthly, yearly, weekly and
  `interval_count > 1` prices, and for `quantity > 1`.

Node's type stripping is used to import the TypeScript helpers directly.
Implementation must confirm the local Node version supports it (22.6+ behind
`--experimental-strip-types`, native from 23); if it does not, `tsx` is added as
the sole devDependency for this purpose.

The Stripe-shaped functions are not mocked. The pure helpers they call — the MRR
normaliser, the status mapper — are what get tested; hand-rolling a Stripe
fixture layer would cost more than it catches.

## Files

Added:

```
middleware.ts
app/admin/layout.tsx
app/admin/page.tsx
app/admin/login/page.tsx
app/admin/clients/page.tsx
app/admin/clients/[id]/page.tsx
app/admin/subscriptions/page.tsx
app/admin/ledger/page.tsx
lib/admin/auth.ts
lib/admin/stripe.ts
lib/admin/format.ts
components/admin/*          sidebar, stat blocks, data rows, empty state
scripts/hash-password.mjs
test/admin.test.mjs
.env.example
```

Modified:

```
package.json            + stripe
tailwind.config.ts      + the --lc token
app/robots.ts           + disallow /admin
```

The landing page is untouched.
