import { formatMoney, type ClientStatus, type Money } from '@/lib/admin/format';

/**
 * Shape rule for these screens, applied everywhere: panels and controls are
 * 4px, pills are full, nothing else. It matches the near-sharp corners the
 * marketing site already uses rather than inventing a second radius scale.
 */

export function PageHeader({
  title,
  meta,
  back,
  children,
}: {
  title: React.ReactNode;
  meta?: string;
  back?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col gap-2 border-b border-line pb-5">
      {back}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <h1 className="m-0 text-[clamp(26px,3.2vw,38px)] font-semibold leading-[1.05] tracking-[-.03em]">
          {title}
        </h1>
        {children}
      </div>
      {meta && <p className="m-0 text-[13px] leading-[1.6] text-ink-3">{meta}</p>}
    </header>
  );
}

/**
 * The headline figures share one bordered frame divided by hairlines instead of
 * sitting in four separate cards. Four boxes of identical weight gave the page
 * no hierarchy, and each one padded its own dead space.
 *
 * Cells draw their own top and left hairline and pull back a pixel, so the grid
 * lines stay correct at any column count and any number of metrics.
 */
export function MetricStrip({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid overflow-hidden rounded-[4px] border border-line bg-surface [grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))]">
      {children}
    </div>
  );
}

export function Metric({
  label,
  value,
  note,
  muted,
}: {
  label: string;
  value: React.ReactNode;
  note?: React.ReactNode;
  /** True when there is no figure - renders the reason at body size, quietly. */
  muted?: boolean;
}) {
  return (
    <div className="-ml-px -mt-px flex min-w-0 flex-col gap-2 border-l border-t border-line p-5 min-[681px]:p-6">
      <span className="font-mono text-[10.5px] uppercase tracking-[.12em] text-ink-3">
        {label}
      </span>
      {muted ? (
        <span className="text-[14px] leading-[1.55] text-ink-3">{value}</span>
      ) : (
        <span className="text-[clamp(25px,2.6vw,33px)] font-semibold leading-[1.05] tracking-[-.03em] tabular-nums">
          {value}
        </span>
      )}
      {note && (
        <span className="mt-auto pt-1 text-[12.5px] leading-[1.5] text-ink-2">
          {note}
        </span>
      )}
    </div>
  );
}

/** A bordered card with the mono label the rest of the site uses. */
export function Panel({
  label,
  action,
  children,
  className = '',
  flush = false,
}: {
  label: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** Tables run to the card edge; the header keeps its padding. */
  flush?: boolean;
}) {
  return (
    <section
      className={`flex min-w-0 flex-col rounded-[4px] border border-line bg-surface ${className}`}
    >
      <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5 min-[681px]:px-6">
        <h2 className="m-0 font-mono text-[10.5px] uppercase tracking-[.12em] text-ink-3">
          {label}
        </h2>
        {action}
      </header>
      <div className={flush ? 'flex-1' : 'flex-1 px-5 py-4 min-[681px]:px-6 min-[681px]:py-5'}>
        {children}
      </div>
    </section>
  );
}

/** Renders one figure per currency, so a mixed-currency account never sums cents blindly. */
export function MoneyList({
  amounts,
  fallback = '-',
}: {
  amounts: Money[];
  fallback?: string;
}) {
  if (!amounts.length) return <>{fallback}</>;
  return (
    <>
      {amounts.map((amount, i) => (
        <span key={amount.currency} className={i ? 'ml-3 text-ink-2' : ''}>
          {formatMoney(amount)}
        </span>
      ))}
    </>
  );
}

export function Row({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 border-b border-line py-3 text-[14.5px] first:pt-0 last:border-b-0 last:pb-0 ${className}`}
    >
      {children}
    </div>
  );
}

/** Figures in a row or table: mono and tabular, so columns line up on the decimal. */
export function Figure({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`font-mono text-[13px] tabular-nums ${className}`}>
      {children}
    </span>
  );
}

const STATUS_STYLE: Record<ClientStatus, string> = {
  Active: 'text-lc border-lc/40 bg-lc/[.07]',
  New: 'text-tt border-tt/40 bg-tt/[.07]',
  Trial: 'text-tt border-tt/40 bg-tt/[.07]',
  Renewal: 'text-ink-2 border-line-strong',
  Overdue: 'text-accent border-accent/40 bg-accent/[.07]',
  Churned: 'text-ink-3 border-line',
};

export function StatusPill({ status }: { status: ClientStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[.1em] ${STATUS_STYLE[status]}`}
    >
      {status === 'Active' && (
        <span className="h-1.5 w-1.5 rounded-full bg-lc" aria-hidden />
      )}
      {status}
    </span>
  );
}

/**
 * Shown wherever a panel has no data source yet. It says what is missing and
 * why - it never stands in for fabricated people, notes or figures. Quiet type
 * on the panel ground, not a dashed box: an empty panel should read as empty,
 * not as a component that failed to load.
 */
export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p className="m-0 py-6 text-[13.5px] leading-[1.65] text-ink-3">{children}</p>
  );
}

/**
 * One table definition drives both layouts: a real table from 769px up, and a
 * stacked card per record below it. A six-column ledger cannot be read on a
 * phone by side-scrolling, so on small screens each row becomes a card with
 * the headline value on top and the rest as labelled fields.
 */
export type Column<T> = {
  key: string;
  header: string;
  align?: 'right';
  /** The card headline on mobile. Exactly one column per table. */
  primary?: boolean;
  /** Sits in the card's top-right on mobile instead of the field list. */
  badge?: boolean;
  cell: (row: T) => React.ReactNode;
};

export function RecordTable<T>({
  columns,
  rows,
  keyOf,
  empty,
}: {
  columns: Column<T>[];
  rows: T[];
  keyOf: (row: T) => string;
  empty: React.ReactNode;
}) {
  if (!rows.length) {
    return (
      <div className="px-5 min-[681px]:px-6">
        <EmptyState>{empty}</EmptyState>
      </div>
    );
  }

  const primary = columns.find((c) => c.primary) ?? columns[0];
  const badge = columns.find((c) => c.badge);
  const fields = columns.filter((c) => c !== primary && c !== badge);

  return (
    <>
      <div className="w-full overflow-x-auto max-[768px]:hidden">
        <table className="w-full border-collapse text-[14.5px]">
          <thead>
            <tr className="border-b border-line bg-surface-2/40 text-left font-mono text-[10px] uppercase tracking-[.12em] text-ink-3">
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={`whitespace-nowrap px-5 py-2.5 font-normal first:pl-6 last:pr-6 ${
                    c.align === 'right' ? 'text-right' : ''
                  }`}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={keyOf(row)}
                className="border-b border-line transition-colors last:border-b-0 hover:bg-surface-2/40"
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={`px-5 py-3 first:pl-6 last:pr-6 ${
                      c.align === 'right' ? 'text-right' : ''
                    }`}
                  >
                    {c.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="m-0 list-none divide-y divide-line p-0 min-[769px]:hidden">
        {rows.map((row) => (
          <li key={keyOf(row)} className="flex flex-col gap-3 px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 text-[15px]">{primary.cell(row)}</div>
              {badge && <div className="shrink-0">{badge.cell(row)}</div>}
            </div>
            <dl className="m-0 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {fields.map((c) => (
                <div key={c.key} className="min-w-0">
                  <dt className="font-mono text-[9.5px] uppercase tracking-[.12em] text-ink-3">
                    {c.header}
                  </dt>
                  <dd className="m-0 mt-0.5 truncate text-[13.5px]">{c.cell(row)}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * Revenue over the trailing year. A line reads the trend at a glance where
 * twelve separate bars did not, and months with nothing paid sit on the
 * baseline instead of disappearing.
 *
 * Plain SVG: a chart library would be the heaviest dependency in the project.
 * The path is drawn in a 0-100 box stretched to the panel, with
 * `vector-effect` keeping the stroke 2px under that stretch.
 */
export function LineChart({
  data,
}: {
  data: { label: string; cents: number; currency: string }[];
}) {
  const peak = Math.max(...data.map((d) => d.cents), 0);
  if (!peak || data.length < 2) {
    return <EmptyState>No paid invoices in the last twelve months.</EmptyState>;
  }

  const currency = data.find((d) => d.cents)?.currency ?? 'aud';
  const total = data.reduce((sum, d) => sum + d.cents, 0);
  const x = (i: number) => (i / (data.length - 1)) * 100;
  const y = (cents: number) => 100 - (cents / peak) * 96;
  const points = data.map((d, i) => `${x(i)},${y(d.cents)}`).join(' L ');

  return (
    <figure className="m-0">
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="text-[19px] font-semibold tracking-[-.02em] tabular-nums">
          {formatMoney({ cents: total, currency })}
        </span>
        <Figure className="text-ink-3">
          Peak {formatMoney({ cents: peak, currency })}
        </Figure>
      </figcaption>

      <div className="relative h-[150px] min-[681px]:h-[184px]">
        <div aria-hidden className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="block h-px w-full bg-line" />
          ))}
        </div>

        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          role="img"
          aria-label={`Revenue by month. Peak ${formatMoney({ cents: peak, currency })}.`}
        >
          <defs>
            <linearGradient id="ops-revenue-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`M 0,100 L ${points} L 100,100 Z`} fill="url(#ops-revenue-fill)" />
          <path
            d={`M ${points}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Points and hit areas sit in HTML so the dots stay round. */}
        <div className="absolute inset-0">
          {data.map((d, i) => (
            <div
              key={`${d.label}-${i}`}
              className="group absolute top-0 h-full -translate-x-1/2"
              style={{ left: `${x(i)}%`, width: `${100 / data.length}%` }}
              title={`${d.label}: ${formatMoney({ cents: d.cents, currency: d.currency })}`}
            >
              <span
                className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0 ring-2 ring-surface transition-opacity group-hover:opacity-100"
                style={{ top: `${y(d.cents)}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2.5 flex">
        {data.map((d, i) => (
          <span
            key={`${d.label}-label-${i}`}
            className="flex-1 text-center font-mono text-[9px] uppercase tracking-[.06em] text-ink-3 min-[681px]:text-[9.5px]"
          >
            {d.label}
          </span>
        ))}
      </div>
    </figure>
  );
}
