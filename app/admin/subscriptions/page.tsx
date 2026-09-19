import Link from 'next/link';
import {
  EmptyState,
  Figure,
  PageHeader,
  Panel,
  RecordTable,
  Row,
  StatusPill,
  type Column,
} from '@/components/admin/ui';
import { formatDate, formatMoney } from '@/lib/admin/format';
import { getSubscriptions, type SubscriptionRow } from '@/lib/admin/stripe';

export const revalidate = 300;

const COLUMNS: Column<SubscriptionRow>[] = [
  {
    key: 'client',
    header: 'Client',
    primary: true,
    cell: (row) =>
      row.customerId ? (
        <Link
          href={`/admin/clients/${row.customerId}`}
          className="font-medium text-ink no-underline hover:text-accent"
        >
          {row.customer}
        </Link>
      ) : (
        <span className="font-medium">{row.customer}</span>
      ),
  },
  {
    key: 'products',
    header: 'Products',
    cell: (row) => <span className="text-ink-2">{row.products}</span>,
  },
  {
    key: 'seats',
    header: 'Seats',
    align: 'right',
    cell: (row) => <Figure className="text-ink-2">{row.seats}</Figure>,
  },
  {
    key: 'mrr',
    header: 'MRR',
    align: 'right',
    cell: (row) => <Figure>{formatMoney(row.mrr)}</Figure>,
  },
  {
    key: 'renews',
    header: 'Renews',
    cell: (row) => <Figure className="text-ink-2">{formatDate(row.renews)}</Figure>,
  },
  {
    key: 'status',
    header: 'Status',
    align: 'right',
    badge: true,
    cell: (row) => <StatusPill status={row.status} />,
  },
];

export default async function SubscriptionsPage() {
  const data = await getSubscriptions();

  if (!data) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="Subscriptions" />
        <Panel label="Stripe">
          <EmptyState>Stripe is not configured on this deployment.</EmptyState>
        </Panel>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Subscriptions"
        meta="Live and trialing subscriptions, with plan changes from the last 30 days."
      />

      <Panel label={`${data.rows.length} subscriptions`} flush>
        <RecordTable
          columns={COLUMNS}
          rows={data.rows}
          keyOf={(row) => row.id}
          empty="No subscriptions in this Stripe account yet."
        />
      </Panel>

      <Panel label="Plan changes">
        {data.changes.length ? (
          data.changes.map((change) => (
            <Row
              key={change.id}
              className="max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-1"
            >
              <span>
                {change.label}
                <span className="ml-2 text-[13px] text-ink-3">{change.detail}</span>
              </span>
              <Figure className="text-[12.5px] text-ink-3">
                {formatDate(change.at)}
              </Figure>
            </Row>
          ))
        ) : (
          <EmptyState>No subscription events in the last 30 days.</EmptyState>
        )}
      </Panel>
    </div>
  );
}
