'use client';

import { useState } from 'react';
import { formatMoney } from '@/lib/admin/format';

type RevenuePoint = {
  label: string;
  period: string;
  cents: number;
  currency: string;
  /** Stripe balance at month close. Null when the reconstruction cannot be trusted. */
  balance: number | null;
};

/**
 * Revenue over the trailing year. A line reads the trend at a glance where
 * twelve separate bars did not, and months with nothing paid sit on the
 * baseline instead of disappearing.
 *
 * Idle, the caption is the twelve-month total and peak. Hovering a month
 * swaps it for that month's collected amount and the Stripe balance at close.
 *
 * Plain SVG: a chart library would be the heaviest dependency in the project.
 * The path is drawn in a 0-100 box stretched to the panel, with
 * `vector-effect` keeping the stroke 2px under that stretch.
 */
export function LineChart({ data }: { data: RevenuePoint[] }) {
  const peak = Math.max(...data.map((d) => d.cents), 0);
  const [active, setActive] = useState<number | null>(null);

  if (!peak || data.length < 2) {
    return (
      <p className="m-0 py-6 text-[13.5px] leading-[1.65] text-ink-3">
        No paid invoices in the last twelve months.
      </p>
    );
  }

  const currency = data.find((d) => d.cents)?.currency ?? 'aud';
  const total = data.reduce((sum, d) => sum + d.cents, 0);
  const last = data.length - 1;
  const x = (i: number) => (i / last) * 100;
  const y = (cents: number) => 100 - (cents / peak) * 96;
  const points = data.map((d, i) => `${x(i)},${y(d.cents)}`).join(' L ');
  const point = active == null ? null : data[active];

  return (
    <figure className="m-0">
      <figcaption
        aria-live="polite"
        className="mb-4 flex min-h-[28px] flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
      >
        {point ? (
          <>
            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[19px] font-semibold tracking-[-.02em] tabular-nums">
                {formatMoney({ cents: point.cents, currency: point.currency })}
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[.12em] text-ink-3">
                {point.period}
              </span>
            </span>
            <span className="font-mono text-[13px] tabular-nums text-ink-3">
              Balance{' '}
              {point.balance == null
                ? '—'
                : formatMoney({
                    cents: point.balance,
                    currency: point.currency,
                  })}
            </span>
          </>
        ) : (
          <>
            <span className="text-[19px] font-semibold tracking-[-.02em] tabular-nums">
              {formatMoney({ cents: total, currency })}
            </span>
            <span className="font-mono text-[13px] tabular-nums text-ink-3">
              Peak {formatMoney({ cents: peak, currency })}
            </span>
          </>
        )}
      </figcaption>

      <table className="sr-only">
        <caption>Revenue by month</caption>
        <thead>
          <tr>
            <th>Month</th>
            <th>Collected</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={`${d.label}-${i}`}>
              <th scope="row">{d.period}</th>
              <td>{formatMoney({ cents: d.cents, currency: d.currency })}</td>
              <td>
                {d.balance == null
                  ? '—'
                  : formatMoney({ cents: d.balance, currency: d.currency })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="cursor-crosshair"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const t = rect.width ? (e.clientX - rect.left) / rect.width : 0;
          setActive(Math.max(0, Math.min(last, Math.round(t * last))));
        }}
        onMouseLeave={() => setActive(null)}
      >
        <div className="relative h-[150px] min-[681px]:h-[184px]">
          <div aria-hidden className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="block h-px w-full bg-line" />
            ))}
          </div>

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
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

          {active != null && (
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <span
                className="absolute inset-y-0 w-px -translate-x-1/2 bg-accent/50"
                style={{ left: `${x(active)}%` }}
              />
              <span
                className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ring-2 ring-surface"
                style={{
                  left: `${x(active)}%`,
                  top: `${y(data[active].cents)}%`,
                }}
              />
            </div>
          )}
        </div>

        <div className="mt-2.5 flex">
          {data.map((d, i) => (
            <span
              key={`${d.label}-label-${i}`}
              className={`flex-1 text-center font-mono text-[9px] uppercase tracking-[.06em] min-[681px]:text-[9.5px] ${
                active === i ? 'text-ink' : 'text-ink-3'
              }`}
            >
              {d.label}
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}
