import {
  EmptyState,
  Figure,
  Metric,
  MetricStrip,
  LineChart,
  MoneyList,
  PageHeader,
  Panel,
  Row,
} from '@/components/admin/ui';
import { formatDate, formatMoney } from '@/lib/admin/format';
import { getOverview } from '@/lib/admin/stripe';

export const revalidate = 300;

export default async function OverviewPage() {
  const data = await getOverview();

  if (!data) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="Overview" />
        <Panel label="Stripe">
          <EmptyState>
            Stripe is not configured on this deployment. Set{' '}
            <code className="font-mono text-ink-2">STRIPE_SECRET_KEY</code> to see
            live figures.
          </EmptyState>
        </Panel>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Overview" meta="Live from Stripe, cached for five minutes." />

      <MetricStrip>
        <Metric
          label="MRR"
          value={<MoneyList amounts={data.mrr} fallback="$0" />}
          note={`${data.counts.active} active, ${data.counts.trialing} trialing, ${data.counts.churned90} churned in 90 days`}
        />
        <Metric
          label="Available balance"
          value={<MoneyList amounts={data.available} fallback="$0" />}
          note={
            data.pending.length
              ? `${data.pending.map(formatMoney).join(', ')} pending`
              : 'Nothing pending'
          }
        />
        {data.nextPayout ? (
          <Metric
            label="Next payout"
            value={formatMoney(data.nextPayout.amount)}
            note={`${data.nextPayout.status}, ${formatDate(data.nextPayout.arrival)}`}
          />
        ) : (
          <Metric label="Next payout" value="No payout scheduled." muted />
        )}
      </MetricStrip>

      <div className="grid gap-5 min-[1101px]:grid-cols-12">
        {/* Revenue, not MRR: Stripe exposes no MRR history. */}
        <Panel label="Revenue, trailing 12 months" className="min-[1101px]:col-span-7">
          <LineChart data={data.trailing12} />
        </Panel>

        <Panel label="Month to date" className="min-[1101px]:col-span-5">
          <Row>
            <span className="text-ink-2">Collected</span>
            <Figure>
              <MoneyList amounts={data.monthToDate.collected} fallback="$0" />
            </Figure>
          </Row>
          <Row>
            <span className="text-ink-2">Outstanding</span>
            <Figure>
              <MoneyList amounts={data.monthToDate.outstanding} fallback="$0" />
            </Figure>
          </Row>
          <Row>
            <span className="text-ink-2">Stripe fees</span>
            <Figure className="text-ink-3">
              <MoneyList amounts={data.monthToDate.fees} fallback="$0" />
            </Figure>
          </Row>
          <Row className="font-semibold">
            <span>Net collected</span>
            <Figure className="text-[14px] font-medium">
              <MoneyList amounts={data.monthToDate.netCollected} fallback="$0" />
            </Figure>
          </Row>
        </Panel>

        <Panel label="Revenue by product" className="min-[1101px]:col-span-6">
          {data.revenueByProduct.length ? (
            data.revenueByProduct.map((product) => (
              <Row key={product.name}>
                <span>{product.name}</span>
                <Figure>{formatMoney(product.mrr)}/mo</Figure>
              </Row>
            ))
          ) : (
            <EmptyState>No live subscriptions yet.</EmptyState>
          )}
        </Panel>

        <Panel label="Needs attention" className="min-[1101px]:col-span-6">
          {data.needsAttention.length ? (
            data.needsAttention.slice(0, 8).map((item, i) => (
              <Row key={`${item.label}-${i}`}>
                <span>{item.label}</span>
                <span className="text-right text-[13px] text-ink-3">
                  {item.detail}
                </span>
              </Row>
            ))
          ) : (
            <EmptyState>Nothing overdue or renewing in the next 30 days.</EmptyState>
          )}
        </Panel>
      </div>
    </div>
  );
}
