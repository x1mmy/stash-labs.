import { LogoMark } from '@/components/Logo';
import { SectionLabel } from '@/components/SectionLabel';

const WEEK = [
  { day: 'Mon', hours: 7.5 },
  { day: 'Tue', hours: 8 },
  { day: 'Wed', hours: 6.5 },
  { day: 'Thu', hours: 8 },
  { day: 'Fri', hours: 5 },
];

const total = WEEK.reduce((sum, d) => sum + d.hours, 0);

export function Products() {
  return (
    <section id="products" className="border-b border-line">
      <div className="shell section-pad">
        <div className="mb-[clamp(32px,4vw,56px)]">
          <div className="mb-5">
            <SectionLabel num="04">Products</SectionLabel>
          </div>
          <h2 className="h2 max-w-[22ch]">Some fixes are worth building twice.</h2>
          <p className="lede mt-4 max-w-[46ch]">
            When we see the same problem at business after business, we turn the
            fix into a product anyone can use. TimeTally is the first.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <a
            href="https://www.timetally.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="group grid overflow-hidden rounded-sm border border-line-strong bg-surface text-ink transition-[border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] [grid-template-columns:minmax(0,1fr)_minmax(0,1.1fr)] hover:-translate-y-[3px] hover:border-ink hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,.35)] max-[760px]:[grid-template-columns:minmax(0,1fr)]"
          >
            <div className="flex flex-col justify-between gap-12 p-[clamp(24px,3.4vw,44px)]">
              <div className="flex items-center gap-2.5 font-mono text-[11.5px] uppercase tracking-[.08em] text-ink-2">
                <span className="h-[7px] w-[7px] rounded-full bg-accent" />
                <span>01 · Live</span>
              </div>

              <div className="flex flex-col gap-3.5">
                <div className="font-brand text-[clamp(44px,5.4vw,76px)] font-extrabold leading-[.95] tracking-[-.04em]">
                  TimeTally
                </div>
                <span className="inline-flex items-center gap-[7px] text-sm text-ink-2">
                  by <LogoMark size={14} />
                  <span className="font-brand font-extrabold tracking-[-.03em] text-ink">
                    stash<span className="ml-[.24em] font-normal">labs</span>
                  </span>
                </span>
                <p className="m-0 mt-2 max-w-[30ch] text-[clamp(17px,1.5vw,20px)] text-ink-2">
                  Digital timesheets for Australian businesses.
                </p>
              </div>

              <span className="inline-flex items-center gap-2.5 self-start border-b border-accent pb-[3px] font-mono text-xs uppercase tracking-[.06em] transition-colors duration-200 group-hover:text-accent">
                Visit timetally.com.au ↗
              </span>
            </div>

            <div
              aria-hidden="true"
              className="flex items-center border-l border-line bg-bg p-[clamp(24px,3.4vw,44px)] max-[760px]:border-l-0 max-[760px]:border-t"
            >
              <div className="w-full border border-line-strong bg-surface font-mono text-xs">
                <div className="flex justify-between gap-3 border-b border-line-strong px-4 py-3 text-[11px] uppercase tracking-[.06em] text-ink-2">
                  <span>Timesheet · this week</span>
                  <span className="text-accent">● Submitted</span>
                </div>
                <div className="px-4 pt-1">
                  {WEEK.map(({ day, hours }) => (
                    <div
                      key={day}
                      className="grid items-center gap-3.5 border-t border-line py-[11px] [grid-template-columns:44px_minmax(0,1fr)_52px]"
                    >
                      <span className="text-ink-3">{day}</span>
                      <div className="h-1.5 bg-[var(--line)]">
                        <div
                          className="h-full bg-ink"
                          style={{ width: `${hours * 10}%` }}
                        />
                      </div>
                      <span className="text-right">{hours.toFixed(1)}h</span>
                    </div>
                  ))}
                </div>
                <div className="mt-1 flex justify-between gap-3 border-t border-line-strong px-4 py-3">
                  <span className="text-ink-2">Week total</span>
                  <span>{total.toFixed(1)}h</span>
                </div>
              </div>
            </div>
          </a>

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-sm border border-dashed border-line-strong px-[clamp(24px,3.4vw,44px)] py-[18px] font-mono text-[11.5px] uppercase tracking-[.08em] text-ink-3">
            <span>02 · Next product</span>
            <span>In build</span>
          </div>
        </div>
      </div>
    </section>
  );
}
