import Link from 'next/link';
import {
  EmptyState,
  Figure,
  PageHeader,
  Panel,
  RecordTable,
  type Column,
} from '@/components/admin/ui';
import { formatDate, formatMoney, sumByCurrency } from '@/lib/admin/format';
import { getLedger, type LedgerRow } from '@/lib/admin/stripe';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'in', label: 'In' },
  { key: 'out', label: 'Out' },
] as const;

const COLUMNS: Column<LedgerRow>[] = [
  {
    key: 'description',
    header: 'Description',
    primary: true,
    cell: (row) => (
      <>
        <span className="capitalize">{row.type}</span>
        <div className="truncate text-[12.5px] text-ink-3">{row.description}</div>
      </>
    ),
  },
  {
    key: 'date',
    header: 'Date',
    cell: (row) => <Figure className="text-ink-2">{formatDate(row.created)}</Figure>,
  },
  {
    key: 'amount',
    header: 'Amount',
    align: 'right',
    badge: true,
    cell: (row) => (
      <Figure className={row.amount.cents < 0 ? 'text-accent' : 'text-lc'}>
        {formatMoney(row.amount)}
      </Figure>
    ),
  },
  {
    key: 'fee',
    header: 'Fee',
    align: 'right',
    cell: (row) => (
      <Figure className="text-ink-3">
        {row.fee.cents ? formatMoney(row.fee) : '-'}
      </Figure>
    ),
  },
  {
    key: 'net',
    header: 'Net',
    align: 'right',
    cell: (row) => <Figure>{formatMoney(row.net)}</Figure>,
  },
];

export default async function LedgerPage({
  searchParams,
}: {
  searchParams: { flow?: string };
}) {
  const rows = await getLedger();
  if (!rows) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="Ledger" />
        <Panel label="Stripe">
          <EmptyState>Stripe is not configured on this deployment.</EmptyState>
        </Panel>
      </div>
    );
  }

  const flow = FILTERS.some((f) => f.key === searchParams.flow)
    ? searchParams.flow
    : 'all';
  const visible = rows.filter((row) =>
    flow === 'in' ? row.amount.cents > 0 : flow === 'out' ? row.amount.cents < 0 : true
  );
  const net = sumByCurrency(visible.map((row) => row.net));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Ledger"
        meta="Stripe balance transactions only: charges, fees, refunds and payouts. Money that never touched Stripe, such as payroll, hosting and contractors, is not here."
      >
        {/* Plain links, so the filter works without client JavaScript. */}
        <div className="flex shrink-0 items-center gap-1 rounded-full border border-line p-1">
          {FILTERS.map((filter) => (
            <Link
              key={filter.key}
              href={
                filter.key === 'all' ? '/admin/ledger' : `/admin/ledger?flow=${filter.key}`
              }
              aria-current={flow === filter.key ? 'true' : undefined}
              className={`rounded-full px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[.12em] no-underline transition-colors ${
                flow === filter.key ? 'bg-ink text-bg' : 'text-ink-3 hover:text-ink'
              }`}
            >
              {filter.label}
            </Link>
          ))}
        </div>
      </PageHeader>

      <Panel
        label={`${visible.length} transactions`}
        flush
        action={
          <Figure className="text-ink-2">
            Net {net.map((n) => formatMoney(n)).join(', ') || '$0'}
          </Figure>
        }
      >
        <RecordTable
          columns={COLUMNS}
          rows={visible}
          keyOf={(row) => row.id}
          empty="No transactions match this filter."
        />
      </Panel>
    </div>
  );
}
