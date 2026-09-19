import { SectionLabel } from '@/components/SectionLabel';

const TT_ROWS = [
  { width: '72%', delay: '0s' },
  { width: '48%', delay: '.2s' },
  { width: '91%', delay: '.4s' },
  { width: '63%', delay: '.6s' },
  { width: '37%', delay: '.8s' },
];

const BUILD_LOG = [
  'interviews.run --n 31',
  'problem.confirmed',
  'scope.cut --features 14',
  'build.start',
  'beta.waitlist --open',
];

const artClass =
  'flex flex-col overflow-hidden rounded border border-line bg-bg [aspect-ratio:4/3] min-h-[250px] max-[680px]:[aspect-ratio:4/3] max-[420px]:[aspect-ratio:auto]';

export function Products() {
  return (
    <section id="work" className="border-t border-line bg-surface">
      <div className="shell py-[clamp(72px,10vw,150px)]">
        <div className="mb-[clamp(36px,5vw,72px)] flex flex-wrap items-baseline justify-between gap-5">
          <div data-reveal>
            <SectionLabel num="03.">Products</SectionLabel>
          </div>
          <h2
            data-reveal
            className="m-0 max-w-[18ch] text-[clamp(28px,3.6vw,50px)] font-semibold leading-[1.08] tracking-[-.025em]"
          >
            One live, one in build
          </h2>
        </div>

        {/* 01 - TimeTally */}
        <article
          data-reveal
          className="mb-[clamp(48px,6vw,88px)] grid gap-[clamp(24px,4vw,64px)] border-t border-line-strong pt-[clamp(24px,3vw,40px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]"
        >
          <div>
            <div className="mb-[18px] flex items-baseline gap-3">
              <span className="font-mono text-[11.5px] text-tt">01</span>
              <h3 className="m-0 text-[clamp(28px,3.4vw,44px)] font-semibold tracking-[-.025em]">
                TimeTally<span className="text-tt">.</span>
              </h3>
            </div>

            <p className="m-0 mb-5 font-serif text-[clamp(20px,2vw,26px)] leading-[1.3] text-ink">
              Payroll, done before lunch.
            </p>
            <p className="m-0 mb-7 max-w-[44ch] text-[16.5px] leading-[1.62] text-ink-2">
              Timesheets in, pay out, compliance handled. Built for the owner
              who currently loses most of a day to it every fortnight.
            </p>

            <div className="mb-7 flex flex-col border-t border-line">
              {[
                'One-click timesheet approval',
                'Automated pay calculations',
                'Australian compliance built in',
              ].map((label, i) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-line py-[11px] text-[15px]"
                >
                  <span>{label}</span>
                  <span className="font-mono text-[11px] text-ink-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-7">
              <div>
                <div className="text-[clamp(40px,5vw,64px)] font-semibold leading-none tracking-[-.03em] text-tt">
                  <span data-count="5">5</span>+ hrs
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[.1em] text-ink-3">
                  Back, every week
                </div>
              </div>
              <a
                href="https://www.timetally.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b border-current pb-[3px] text-[15px] font-semibold text-tt transition-opacity hover:opacity-75"
              >
                Visit timetally.com.au <span className="font-mono">↗</span>
              </a>
            </div>
          </div>

          <div>
            <div className={artClass}>
              <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 font-mono text-[10.5px] uppercase tracking-[.1em] text-ink-3">
                <span>Fortnight 14</span>
                <span className="text-tt">9 staff</span>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-[13px] px-4 py-[18px]">
                {TT_ROWS.map((row) => (
                  <div
                    key={row.delay}
                    className="grid items-center gap-3 [grid-template-columns:44px_minmax(0,1fr)_18px]"
                  >
                    <div className="h-2 rounded-sm bg-surface-2" />
                    <div className="h-2 overflow-hidden rounded-sm bg-surface-2">
                      <div
                        className="h-full origin-left bg-tt [animation:fillRow_5.4s_cubic-bezier(.16,1,.3,1)_infinite]"
                        style={{ width: row.width, animationDelay: row.delay }}
                      />
                    </div>
                    <div
                      className="font-mono text-[11px] text-tt [animation:popTick_5.4s_ease_infinite]"
                      style={{ animationDelay: row.delay }}
                    >
                      ✓
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-[13px] font-mono text-[11px] uppercase tracking-[.08em] text-ink-2">
                <span>Ready to pay</span>
                <span className="text-tt">00:41:12</span>
              </div>
            </div>
            <p className="mx-0.5 mb-0 mt-3 font-mono text-[11.5px] text-ink-3">
              <span className="text-tt">fig. 2</span> &nbsp;A fortnight approved
              in one pass.
            </p>
          </div>
        </article>

        {/* 02 - In build */}
        <article
          data-reveal
          className="grid gap-[clamp(24px,4vw,64px)] border-t border-line-strong pt-[clamp(24px,3vw,40px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]"
        >
          <div>
            <div className="mb-[18px] flex items-baseline gap-3">
              <span className="font-mono text-[11.5px] text-accent">02</span>
              <h3 className="m-0 text-[clamp(28px,3.4vw,44px)] font-semibold tracking-[-.025em]">
                In build<span className="text-accent">.</span>
              </h3>
            </div>

            <p className="m-0 mb-5 font-serif text-[clamp(20px,2vw,26px)] leading-[1.3] text-ink">
              The next one, not announced yet.
            </p>
            <p className="m-0 mb-7 max-w-[44ch] text-[16.5px] leading-[1.62] text-ink-2">
              We are heads-down on a new product. Same brief as always: one job
              a small business currently does badly, done properly, built for
              here. It ships when the businesses we are testing with say it is
              ready.
            </p>

            <div className="mb-7 flex flex-col border-t border-line">
              {[
                ['Customer interviews', 'In progress', true],
                ['Private beta', 'Soon', false],
                ['Public launch', 'TBA', false],
              ].map(([label, status, live]) => (
                <div
                  key={label as string}
                  className="flex justify-between gap-4 border-b border-line py-[11px] text-[15px]"
                >
                  <span>{label as string}</span>
                  <span
                    className={`font-mono text-[11px] ${live ? 'text-accent' : 'text-ink-3'}`}
                  >
                    {status as string}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 border-b border-current pb-[3px] text-[15px] font-semibold text-accent transition-opacity hover:opacity-75"
            >
              Ask to test it early <span className="font-mono">→</span>
            </a>
          </div>

          <div>
            <div className={artClass}>
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-surface-2" />
                <span className="h-2 w-2 rounded-full bg-surface-2" />
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="ml-2 font-mono text-[10.5px] uppercase tracking-[.1em] text-ink-3">
                  build log
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-[11px] px-4 py-[18px] font-mono text-xs text-ink-2">
                {BUILD_LOG.map((line, i) => (
                  <div
                    key={line}
                    className="overflow-hidden whitespace-nowrap [animation:typeLine_9s_steps(28)_infinite]"
                    style={{ animationDelay: `${i * 0.9}s` }}
                  >
                    <span className="text-accent">›</span> {line}
                  </div>
                ))}
                <div className="flex items-center gap-1.5">
                  <span className="text-accent">›</span>
                  <span className="inline-block h-[15px] w-2 bg-accent [animation:caret_1s_step-end_infinite]" />
                </div>
              </div>
            </div>
            <p className="mx-0.5 mb-0 mt-3 font-mono text-[11.5px] text-ink-3">
              <span className="text-accent">fig. 3</span> &nbsp;Thirty-one
              conversations before a line of code.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
