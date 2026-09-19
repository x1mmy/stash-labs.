import Link from 'next/link';
import {
  EmptyState,
  Figure,
  PageHeader,
  Panel,
  RecordTable,
  StatusPill,
  type Column,
} from '@/components/admin/ui';
import { formatMoney, sumByCurrency } from '@/lib/admin/format';
import { getClients, type ClientRow } from '@/lib/admin/stripe';

const COLUMNS: Column<ClientRow>[] = [
  {
    key: 'client',
    header: 'Client',
    primary: true,
    cell: (client) => (
      <>
        <Link
          href={`/admin/clients/${client.id}`}
          className="font-medium text-ink no-underline hover:text-accent"
        >
          {client.name}
        </Link>
        {client.email && (
          <div className="truncate text-[12.5px] text-ink-3">{client.email}</div>
        )}
      </>
    ),
  },
  {
    key: 'products',
    header: 'Products',
    cell: (client) => (
      <span className="text-ink-2">{client.products.join(', ') || '-'}</span>
    ),
  },
  {
    key: 'seats',
    header: 'Seats',
    align: 'right',
    cell: (client) => <Figure className="text-ink-2">{client.seats || '-'}</Figure>,
  },
  {
    key: 'mrr',
    header: 'MRR',
    align: 'right',
    cell: (client) => (
      <Figure>{client.mrr.cents ? formatMoney(client.mrr) : '-'}</Figure>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    align: 'right',
    badge: true,
    cell: (client) => <StatusPill status={client.status} />,
  },
];

export default async function ClientsPage() {
  const clients = await getClients();

  if (!clients) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="Clients" />
        <Panel label="Stripe">
          <EmptyState>Stripe is not configured on this deployment.</EmptyState>
        </Panel>
      </div>
    );
  }

  const mrr = sumByCurrency(clients.map((c) => c.mrr));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Clients"
        meta="Every customer in this Stripe account."
      >
        <Figure className="text-ink-2">
          {mrr.map(formatMoney).join(', ') || '$0'} a month
        </Figure>
      </PageHeader>

      <Panel label={`${clients.length} customers`} flush>
        <RecordTable
          columns={COLUMNS}
          rows={clients}
          keyOf={(client) => client.id}
          empty="No customers in this Stripe account yet."
        />
      </Panel>
    </div>
  );
}
