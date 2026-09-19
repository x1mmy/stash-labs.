import { SectionLabel } from '@/components/SectionLabel';

const META = [
  ['Sector', 'Events & hospitality'],
  ['City', 'Sydney'],
  ['Scope', 'Design, build, launch'],
];

function WireframeRun() {
  return (
    <>
      <div className="h-[clamp(56px,9vw,104px)] rounded-[3px] border border-line [background:repeating-linear-gradient(135deg,var(--surface-2)_0_2px,transparent_2px_10px)]" />
      <div className="grid grid-cols-3 gap-3.5">
        <div className="h-[clamp(34px,5vw,62px)] rounded-[3px] bg-surface-2" />
        <div className="h-[clamp(34px,5vw,62px)] rounded-[3px] bg-surface-2" />
        <div className="h-[clamp(34px,5vw,62px)] rounded-[3px] bg-surface-2" />
      </div>
      <div className="h-2.5 w-[62%] rounded-sm bg-surface-2" />
      <div className="h-2.5 w-[44%] rounded-sm bg-accent opacity-50" />
    </>
  );
}

export function Websites() {
  return (
    <section className="border-t border-line">
      <div className="shell py-[clamp(72px,10vw,150px)]">
        <div className="mb-[clamp(36px,5vw,64px)] grid gap-[clamp(28px,5vw,80px)] [grid-template-columns:minmax(0,1fr)_minmax(0,2.1fr)] max-[680px]:[grid-template-columns:minmax(0,1fr)]">
          <div data-reveal>
            <SectionLabel num="04.">Client work</SectionLabel>
          </div>
          <div>
            <h2
              data-reveal
              className="m-0 mb-6 max-w-[18ch] text-balance text-[clamp(30px,4.2vw,58px)] font-semibold leading-[1.08] tracking-[-.025em]"
            >
              We also build websites<span className="text-accent">.</span>
            </h2>
            <p
              data-reveal
              className="m-0 max-w-[52ch] text-[clamp(16px,1.35vw,18px)] leading-[1.62] text-ink-2"
            >
              Not a template, not a $10k agency quote and not three months of
              meetings. A site that loads fast, says what the business does, and
              is live in weeks.
            </p>
          </div>
        </div>

        <div
          data-reveal
          className="overflow-hidden rounded border border-line bg-surface"
        >
          <div className="flex min-h-[220px] flex-col overflow-hidden bg-bg [aspect-ratio:16/7] max-[680px]:[aspect-ratio:4/3] max-[420px]:[aspect-ratio:auto]">
            <div className="flex items-center gap-2 border-b border-line px-4 py-[11px]">
              <span className="h-2 w-2 rounded-full bg-surface-2" />
              <span className="h-2 w-2 rounded-full bg-surface-2" />
              <span className="h-2 w-2 rounded-full bg-surface-2" />
              <span className="ml-2.5 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[10.5px] text-ink-3">
                prestigeeventcollective.com.au
              </span>
            </div>
            <div className="relative flex-1 overflow-hidden">
              <div className="flex flex-col gap-3.5 p-[clamp(16px,2.4vw,28px)] [animation:driftUp_18s_linear_infinite]">
                <WireframeRun />
                <WireframeRun />
              </div>
            </div>
          </div>

          <div className="grid gap-[clamp(20px,3vw,48px)] border-t border-line p-[clamp(24px,3vw,40px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[.1em] text-accent">
                Prestige Event Collective
              </div>
              <p className="m-0 mb-[18px] font-serif text-[clamp(19px,2vw,24px)] leading-[1.3]">
                They had no website. We built one. It is live.
              </p>
              <a
                href="https://www.prestigeeventcollective.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b border-current pb-[3px] text-[15px] font-semibold transition-opacity hover:opacity-75"
              >
                View live site <span className="font-mono">↗</span>
              </a>
            </div>

            <div className="flex flex-col gap-2.5 font-mono text-[12.5px] text-ink-2">
              {META.map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-3 border-b border-line pb-2"
                >
                  <span className="text-ink-3">{k}</span>
                  <span className="text-ink">{v}</span>
                </div>
              ))}
              <div className="flex justify-between gap-3">
                <span className="text-ink-3">Status</span>
                <span className="text-accent">Live</span>
              </div>
            </div>
          </div>
        </div>

        <p className="mx-0.5 mb-0 mt-3 font-mono text-[11.5px] text-ink-3">
          <span className="text-accent">fig. 4</span> &nbsp;First client. Fully
          paid. Live today.
        </p>
      </div>
    </section>
  );
}
