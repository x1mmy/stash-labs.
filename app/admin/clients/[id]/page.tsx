import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  EmptyState,
  Figure,
  Metric,
  MetricStrip,
  PageHeader,
  Panel,
  Row,
  StatusPill,
} from '@/components/admin/ui';
import { formatDate, formatMoney } from '@/lib/admin/format';
import { getClient } from '@/lib/admin/stripe';

export const revalidate = 300;

export default async function ClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const client = await getClient(params.id);
  if (!client) notFound();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={
          <span className="flex flex-wrap items-center gap-3">
            {client.name}
            <StatusPill status={client.status} />
          </span>
        }
        meta={client.email ?? undefined}
        back={
          <Link
            href="/admin/clients"
            className="w-fit font-mono text-[10.5px] uppercase tracking-[.12em] text-ink-3 no-underline transition-colors hover:text-ink"
          >
            ← All clients
          </Link>
        }
      />

      <MetricStrip>
        <Metric label="MRR" value={formatMoney(client.mrr)} note="Normalised monthly" />
        <Metric
          label="Lifetime revenue"
          value={formatMoney(client.lifetime)}
          note="Paid invoices"
        />
        <Metric
          label="Client since"
          value={formatDate(client.since)}
          note="First subscription"
        />
        <Metric
          label="Renews"
          value={formatDate(client.renews)}
          note="Current period ends"
        />
      </MetricStrip>

      <div className="grid gap-5 min-[1101px]:grid-cols-12">
        <Panel label="Products and seats" className="min-[1101px]:col-span-5">
          {client.items.length ? (
            client.items.map((item, i) => (
              <Row key={`${item.product}-${i}`}>
                <span>
                  {item.product}
                  <span className="ml-2 text-[13px] text-ink-3">
                    {item.seats} {item.seats === 1 ? 'seat' : 'seats'}, {item.interval}
                  </span>
                </span>
                <Figure>{formatMoney(item.mrr)}/mo</Figure>
              </Row>
            ))
          ) : (
            <EmptyState>No live subscription.</EmptyState>
          )}
        </Panel>

        <Panel label="Invoices" className="min-[1101px]:col-span-7">
          {client.invoices.length ? (
            client.invoices.map((invoice) => (
              <Row key={invoice.id}>
                <span>
                  {invoice.url ? (
                    <a href={invoice.url} target="_blank" rel="noreferrer">
                      {invoice.number ?? invoice.id}
                    </a>
                  ) : (
                    (invoice.number ?? invoice.id)
                  )}
                  <span className="ml-2 text-[13px] text-ink-3">
                    {formatDate(invoice.date)}
                  </span>
                </span>
                <span className="flex items-baseline gap-3">
                  <Figure>{formatMoney(invoice.amount)}</Figure>
                  <span className="font-mono text-[11px] uppercase tracking-[.1em] text-ink-3">
                    {invoice.status}
                  </span>
                </span>
              </Row>
            ))
          ) : (
            <EmptyState>No invoices yet.</EmptyState>
          )}
        </Panel>
      </div>

      {/* One honest panel rather than three empty cards of equal weight. */}
      <Panel label="Not built yet">
        <ul className="m-0 grid list-none gap-3 p-0 text-[13.5px] leading-[1.6] text-ink-3 min-[681px]:grid-cols-3">
          <li>
            <span className="block text-ink-2">Contacts</span>
            Who to email at this client.
          </li>
          <li>
            <span className="block text-ink-2">Activity</span>
            Calls, scope changes and deploys.
          </li>
          <li>
            <span className="block text-ink-2">Internal note</span>
            Whatever the three of us need to remember.
          </li>
        </ul>
        <p className="mb-0 mt-4 border-t border-line pt-3 text-[12.5px] text-ink-3">
          All three live in the Neon database, which is not built yet.
        </p>
      </Panel>
    </div>
  );
}
