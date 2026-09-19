/** Pure formatting and money maths. No Stripe SDK import, so it is testable. */

export type Money = { cents: number; currency: string };

export type ClientStatus =
  | 'Active'
  | 'Trial'
  | 'New'
  | 'Renewal'
  | 'Overdue'
  | 'Churned';

const NINETY_DAYS = 90 * 24 * 60 * 60 * 1000;

// Cents always. Dropping them above some threshold makes one screen read
// "$1,117" next to "$250.00", and these are figures people reconcile.
export function formatMoney({ cents, currency }: Money): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

export function formatDate(seconds: number | null | undefined): string {
  if (!seconds) return '-';
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(seconds * 1000));
}

export function formatMonth(seconds: number): string {
  return new Intl.DateTimeFormat('en-AU', {
    month: 'short',
    year: '2-digit',
  }).format(new Date(seconds * 1000));
}

/**
 * Normalises any recurring price to a monthly figure in cents.
 *
 *   month → 1/n   year → 1/(12n)   week → 52/(12n)   day → 365/(12n)
 *
 * Returns a float in cents; callers round only at the point of display so a
 * column of yearly plans does not drift by a cent per row.
 */
export function monthlyCents(
  unitAmount: number | null | undefined,
  interval: string | null | undefined,
  intervalCount: number | null | undefined,
  quantity: number | null | undefined
): number {
  if (!unitAmount || !interval) return 0;
  const n = intervalCount && intervalCount > 0 ? intervalCount : 1;
  const factor =
    interval === 'month'
      ? 1 / n
      : interval === 'year'
        ? 1 / (12 * n)
        : interval === 'week'
          ? 52 / (12 * n)
          : interval === 'day'
            ? 365 / (12 * n)
            : 0;
  return unitAmount * (quantity ?? 1) * factor;
}

/**
 * Stripe cannot see seat usage, so the mockup's "At risk" has no source and is
 * not invented here. Everything below is derivable from the subscription.
 */
export function clientStatus(
  status: string,
  opts: {
    created?: number;
    cancelAtPeriodEnd?: boolean;
    now?: number;
  } = {}
): ClientStatus {
  const now = opts.now ?? Date.now();
  if (status === 'past_due' || status === 'unpaid') return 'Overdue';
  if (status === 'trialing') return 'Trial';
  if (status === 'canceled' || status === 'incomplete_expired') return 'Churned';
  if (status === 'active') {
    if (opts.cancelAtPeriodEnd) return 'Renewal';
    if (opts.created && now - opts.created * 1000 < NINETY_DAYS) return 'New';
    return 'Active';
  }
  return 'Churned';
}

/** Sums amounts that may span currencies, rather than adding cents blindly. */
export function sumByCurrency(entries: Money[]): Money[] {
  const totals = new Map<string, number>();
  for (const { cents, currency } of entries) {
    const key = currency.toLowerCase();
    totals.set(key, (totals.get(key) ?? 0) + cents);
  }
  return [...totals]
    .map(([currency, cents]) => ({ currency, cents: Math.round(cents) }))
    .sort((a, b) => b.cents - a.cents);
}
