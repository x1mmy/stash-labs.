import Stripe from 'stripe';
import {
  clientStatus,
  monthlyCents,
  sumByCurrency,
  type ClientStatus,
  type Money,
} from './format';

// ponytail: hard cap on every list call. The studio has single-digit clients;
// this is the number to raise when that stops being true, not a reason to
// build a sync job today.
const CAP = 200;

let cached: Stripe | null = null;

/**
 * Null when `STRIPE_SECRET_KEY` is unset, so an unconfigured deployment (or a
 * build with no secrets) renders empty states instead of throwing.
 */
export function stripeOrNull(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!cached) cached = new Stripe(key);
  return cached;
}

const money = (cents: number, currency: string): Money => ({ cents, currency });

function monthStart(now = new Date()): number {
  return Math.floor(
    new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000
  );
}

function monthsAgo(n: number, now = new Date()): number {
  return Math.floor(
    new Date(now.getFullYear(), now.getMonth() - n, 1).getTime() / 1000
  );
}

/** Renewal moved onto the subscription item in recent API versions. */
function periodEnd(sub: Stripe.Subscription): number | null {
  return sub.items.data[0]?.current_period_end ?? null;
}

function subscriptionMrr(sub: Stripe.Subscription): Money {
  const cents = sub.items.data.reduce(
    (total, item) =>
      total +
      monthlyCents(
        item.price.unit_amount,
        item.price.recurring?.interval,
        item.price.recurring?.interval_count,
        item.quantity
      ),
    0
  );
  return money(cents, sub.currency);
}

const customerId = (
  c: string | Stripe.Customer | Stripe.DeletedCustomer | null
): string | null => (typeof c === 'string' ? c : (c?.id ?? null));

const productId = (p: string | Stripe.Product | Stripe.DeletedProduct): string =>
  typeof p === 'string' ? p : p.id;

const isLive = (s: Stripe.Subscription) =>
  s.status === 'active' || s.status === 'trialing' || s.status === 'past_due';

async function listAll<T>(
  page: Stripe.ApiListPromise<T>
): Promise<T[]> {
  return page.autoPagingToArray({ limit: CAP });
}

// --- Overview ---------------------------------------------------------------

export type Overview = {
  available: Money[];
  pending: Money[];
  nextPayout: { amount: Money; arrival: number; status: string } | null;
  mrr: Money[];
  counts: { active: number; trialing: number; churned90: number };
  monthToDate: {
    collected: Money[];
    outstanding: Money[];
    fees: Money[];
    netCollected: Money[];
  };
  revenueByProduct: { name: string; mrr: Money }[];
  /** Revenue, not MRR - Stripe exposes no MRR history. */
  trailing12: { label: string; cents: number; currency: string }[];
  needsAttention: { label: string; detail: string }[];
};

export async function getOverview(): Promise<Overview | null> {
  const stripe = stripeOrNull();
  if (!stripe) return null;

  const since = monthsAgo(11);
  const mStart = monthStart();

  const [balance, payouts, subs, invoices, txns, products] = await Promise.all([
    stripe.balance.retrieve(),
    stripe.payouts.list({ limit: 10 }),
    listAll(stripe.subscriptions.list({ status: 'all', limit: 100 })),
    listAll(stripe.invoices.list({ created: { gte: since }, limit: 100 })),
    listAll(
      stripe.balanceTransactions.list({ created: { gte: mStart }, limit: 100 })
    ),
    listAll(stripe.products.list({ limit: 100 })),
  ]);

  const names = new Map(products.map((p) => [p.id, p.name]));
  const live = subs.filter(isLive);
  const ninetyDaysAgo = Date.now() / 1000 - 90 * 24 * 60 * 60;

  // "Next" means still coming. A payout already paid out is not one, and the
  // panel shows its empty state rather than last month's transfer.
  const nextPayout = payouts.data.find(
    (p) => p.status === 'pending' || p.status === 'in_transit'
  );

  // Revenue by product, from the live subscription items.
  const byProduct = new Map<string, { name: string; cents: number; currency: string }>();
  for (const sub of live) {
    for (const item of sub.items.data) {
      const id = productId(item.price.product);
      const cents = monthlyCents(
        item.price.unit_amount,
        item.price.recurring?.interval,
        item.price.recurring?.interval_count,
        item.quantity
      );
      const row = byProduct.get(id) ?? {
        name: names.get(id) ?? 'Unnamed product',
        cents: 0,
        currency: sub.currency,
      };
      row.cents += cents;
      byProduct.set(id, row);
    }
  }

  // Trailing 12 - paid invoices bucketed by when they were paid.
  const buckets = new Map<string, { label: string; cents: number; currency: string }>();
  for (let i = 11; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i, 1);
    buckets.set(`${d.getFullYear()}-${d.getMonth()}`, {
      label: new Intl.DateTimeFormat('en-AU', { month: 'short' }).format(d),
      cents: 0,
      currency: 'aud',
    });
  }
  for (const inv of invoices) {
    const paidAt = inv.status_transitions?.paid_at;
    if (!paidAt || !inv.amount_paid) continue;
    const d = new Date(paidAt * 1000);
    const bucket = buckets.get(`${d.getFullYear()}-${d.getMonth()}`);
    if (bucket) {
      bucket.cents += inv.amount_paid;
      bucket.currency = inv.currency;
    }
  }

  const mtd = invoices.filter((i) => (i.created ?? 0) >= mStart);
  const outstanding = invoices.filter(
    (i) => i.status === 'open' && i.amount_remaining > 0
  );
  const fees = sumByCurrency(txns.map((t) => money(t.fee, t.currency)));
  const collected = sumByCurrency(
    mtd.filter((i) => i.amount_paid > 0).map((i) => money(i.amount_paid, i.currency))
  );

  // Needs attention: overdue invoices, and anything renewing inside 30 days.
  const soon = Date.now() / 1000 + 30 * 24 * 60 * 60;
  const needsAttention: { label: string; detail: string }[] = [];
  for (const inv of outstanding) {
    if (inv.due_date && inv.due_date * 1000 < Date.now()) {
      needsAttention.push({
        label: `Invoice ${inv.number ?? inv.id} overdue`,
        detail: inv.customer_name ?? inv.customer_email ?? 'Unknown customer',
      });
    }
  }
  for (const sub of live) {
    const end = periodEnd(sub);
    if (end && end < soon) {
      needsAttention.push({
        label: sub.cancel_at_period_end ? 'Cancels this period' : 'Renews within 30 days',
        detail: sub.items.data
          .map((i) => names.get(productId(i.price.product)) ?? 'Subscription')
          .join(', '),
      });
    }
  }

  return {
    available: balance.available.map((b) => money(b.amount, b.currency)),
    pending: balance.pending.map((b) => money(b.amount, b.currency)),
    nextPayout: nextPayout
      ? {
          amount: money(nextPayout.amount, nextPayout.currency),
          arrival: nextPayout.arrival_date,
          status: nextPayout.status,
        }
      : null,
    mrr: sumByCurrency(live.map(subscriptionMrr)),
    counts: {
      active: subs.filter((s) => s.status === 'active').length,
      trialing: subs.filter((s) => s.status === 'trialing').length,
      churned90: subs.filter(
        (s) => s.status === 'canceled' && (s.canceled_at ?? 0) > ninetyDaysAgo
      ).length,
    },
    monthToDate: {
      collected,
      outstanding: sumByCurrency(
        outstanding.map((i) => money(i.amount_remaining, i.currency))
      ),
      fees,
      netCollected: sumByCurrency([
        ...collected,
        ...fees.map((f) => money(-f.cents, f.currency)),
      ]),
    },
    revenueByProduct: [...byProduct.values()]
      .map((r) => ({ name: r.name, mrr: money(Math.round(r.cents), r.currency) }))
      .sort((a, b) => b.mrr.cents - a.mrr.cents),
    trailing12: [...buckets.values()],
    needsAttention,
  };
}

// --- Clients ----------------------------------------------------------------

export type ClientRow = {
  id: string;
  name: string;
  email: string | null;
  products: string[];
  seats: number;
  mrr: Money;
  status: ClientStatus;
};

export async function getClients(): Promise<ClientRow[] | null> {
  const stripe = stripeOrNull();
  if (!stripe) return null;

  const [customers, subs, products] = await Promise.all([
    listAll(stripe.customers.list({ limit: 100 })),
    listAll(stripe.subscriptions.list({ status: 'all', limit: 100 })),
    listAll(stripe.products.list({ limit: 100 })),
  ]);

  const names = new Map(products.map((p) => [p.id, p.name]));
  const byCustomer = new Map<string, Stripe.Subscription[]>();
  for (const sub of subs) {
    const id = customerId(sub.customer);
    if (!id) continue;
    byCustomer.set(id, [...(byCustomer.get(id) ?? []), sub]);
  }

  return customers
    .map((customer) => {
      const owned = byCustomer.get(customer.id) ?? [];
      const live = owned.filter(isLive);
      const primary = live[0] ?? owned[0];
      return {
        id: customer.id,
        name: customer.name ?? customer.email ?? customer.id,
        email: customer.email,
        products: [
          ...new Set(
            live.flatMap((s) =>
              s.items.data.map(
                (i) => names.get(productId(i.price.product)) ?? 'Subscription'
              )
            )
          ),
        ],
        seats: live.reduce(
          (n, s) => n + s.items.data.reduce((q, i) => q + (i.quantity ?? 1), 0),
          0
        ),
        mrr: {
          cents: Math.round(
            live.reduce((c, s) => c + subscriptionMrr(s).cents, 0)
          ),
          currency: primary?.currency ?? customer.currency ?? 'aud',
        },
        status: primary
          ? clientStatus(primary.status, {
              created: primary.created,
              cancelAtPeriodEnd: primary.cancel_at_period_end,
            })
          : ('Churned' as ClientStatus),
      };
    })
    .sort((a, b) => b.mrr.cents - a.mrr.cents);
}

export type ClientDetail = {
  id: string;
  name: string;
  email: string | null;
  created: number;
  status: ClientStatus;
  mrr: Money;
  lifetime: Money;
  since: number | null;
  renews: number | null;
  items: { product: string; seats: number; mrr: Money; interval: string }[];
  invoices: {
    id: string;
    number: string | null;
    status: string;
    amount: Money;
    date: number | null;
    url: string | null;
  }[];
};

export async function getClient(id: string): Promise<ClientDetail | null> {
  const stripe = stripeOrNull();
  if (!stripe) return null;

  // An id that is not in this account is a 404, not a 500.
  const customer = await stripe.customers.retrieve(id).catch(() => null);
  if (!customer || customer.deleted) return null;

  const [subs, invoices, products] = await Promise.all([
    listAll(
      stripe.subscriptions.list({ customer: id, status: 'all', limit: 100 })
    ),
    listAll(stripe.invoices.list({ customer: id, limit: 100 })),
    listAll(stripe.products.list({ limit: 100 })),
  ]);

  const names = new Map(products.map((p) => [p.id, p.name]));
  const live = subs.filter(isLive);
  const primary = live[0] ?? subs[0];
  const currency = primary?.currency ?? customer.currency ?? 'aud';

  return {
    id: customer.id,
    name: customer.name ?? customer.email ?? customer.id,
    email: customer.email,
    created: customer.created,
    status: primary
      ? clientStatus(primary.status, {
          created: primary.created,
          cancelAtPeriodEnd: primary.cancel_at_period_end,
        })
      : 'Churned',
    mrr: money(
      Math.round(live.reduce((c, s) => c + subscriptionMrr(s).cents, 0)),
      currency
    ),
    lifetime: money(
      invoices.reduce((c, i) => c + i.amount_paid, 0),
      currency
    ),
    since: subs.length ? Math.min(...subs.map((s) => s.created)) : null,
    renews: primary ? periodEnd(primary) : null,
    items: live.flatMap((sub) =>
      sub.items.data.map((item) => ({
        product: names.get(productId(item.price.product)) ?? 'Subscription',
        seats: item.quantity ?? 1,
        mrr: money(
          Math.round(
            monthlyCents(
              item.price.unit_amount,
              item.price.recurring?.interval,
              item.price.recurring?.interval_count,
              item.quantity
            )
          ),
          sub.currency
        ),
        interval: item.price.recurring
          ? `${item.price.recurring.interval}ly`
          : 'one-off',
      }))
    ),
    invoices: invoices
      .sort((a, b) => (b.created ?? 0) - (a.created ?? 0))
      .slice(0, 12)
      .map((i) => ({
        id: i.id ?? '',
        number: i.number,
        status: i.status ?? 'unknown',
        amount: money(i.amount_due, i.currency),
        date: i.status_transitions?.paid_at ?? i.created ?? null,
        url: i.hosted_invoice_url ?? null,
      })),
  };
}

// --- Subscriptions ----------------------------------------------------------

export type SubscriptionRow = {
  id: string;
  customer: string;
  customerId: string | null;
  products: string;
  seats: number;
  mrr: Money;
  status: ClientStatus;
  renews: number | null;
};

export type PlanChange = { id: string; label: string; detail: string; at: number };

export async function getSubscriptions(): Promise<{
  rows: SubscriptionRow[];
  changes: PlanChange[];
} | null> {
  const stripe = stripeOrNull();
  if (!stripe) return null;

  const [subs, customers, products, events] = await Promise.all([
    listAll(stripe.subscriptions.list({ status: 'all', limit: 100 })),
    listAll(stripe.customers.list({ limit: 100 })),
    listAll(stripe.products.list({ limit: 100 })),
    stripe.events.list({
      limit: 15,
      types: [
        'customer.subscription.created',
        'customer.subscription.updated',
        'customer.subscription.deleted',
      ],
    }),
  ]);

  const names = new Map(products.map((p) => [p.id, p.name]));
  const customerNames = new Map(
    customers.map((c) => [c.id, c.name ?? c.email ?? c.id])
  );

  return {
    rows: subs
      .map((sub) => {
        const id = customerId(sub.customer);
        return {
          id: sub.id,
          customer: (id && customerNames.get(id)) || 'Unknown customer',
          customerId: id,
          products: sub.items.data
            .map((i) => names.get(productId(i.price.product)) ?? 'Subscription')
            .join(', '),
          seats: sub.items.data.reduce((q, i) => q + (i.quantity ?? 1), 0),
          mrr: money(Math.round(subscriptionMrr(sub).cents), sub.currency),
          status: clientStatus(sub.status, {
            created: sub.created,
            cancelAtPeriodEnd: sub.cancel_at_period_end,
          }),
          renews: periodEnd(sub),
        };
      })
      .sort((a, b) => b.mrr.cents - a.mrr.cents),
    changes: events.data.map((e) => ({
      id: e.id,
      label:
        e.type === 'customer.subscription.created'
          ? 'Subscription started'
          : e.type === 'customer.subscription.deleted'
            ? 'Subscription cancelled'
            : 'Subscription updated',
      detail: (() => {
        const object = e.data.object as Stripe.Subscription;
        const id = customerId(object.customer);
        return (id && customerNames.get(id)) || object.id;
      })(),
      at: e.created,
    })),
  };
}

// --- Ledger -----------------------------------------------------------------

export type LedgerRow = {
  id: string;
  created: number;
  type: string;
  description: string;
  amount: Money;
  fee: Money;
  net: Money;
};

export async function getLedger(): Promise<LedgerRow[] | null> {
  const stripe = stripeOrNull();
  if (!stripe) return null;

  const txns = await listAll(stripe.balanceTransactions.list({ limit: 100 }));
  return txns.map((t) => ({
    id: t.id,
    created: t.created,
    type: t.type.replace(/_/g, ' '),
    description: t.description ?? '-',
    amount: money(t.amount, t.currency),
    fee: money(t.fee, t.currency),
    net: money(t.net, t.currency),
  }));
}
