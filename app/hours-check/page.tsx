import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { BookSection } from '@/components/BookForm';
import { HoursReport } from '@/components/HoursReport';
import { FigureFrame } from '@/components/HairlineFigure';
import { HoursFaq } from '@/components/landing/HoursFaq';
import { HoursMotion } from '@/components/landing/HoursMotion';
import { FileFigure } from '@/components/landing/FileFigure';

export const metadata: Metadata = {
  title: 'Hours Check | Stash Labs',
  description:
    'A free Hours Check, on site or on a call, ends with a written report that puts a dollar figure on the hours you lose to admin.',
  alternates: { canonical: '/hours-check' },
};

const NAV = [
  { href: '#report', label: 'The report' },
  { href: '#check', label: 'The check' },
  { href: '#faq', label: 'FAQ' },
];

const SHEETS: [1 | 2 | 3, string, string, string][] = [
  [
    1,
    'Your yearly cost, in dollars',
    '1 The number',
    'What repeated admin costs you each year.',
  ],
  [
    2,
    'Every job we watched',
    '2 What we saw',
    'Each job, who does it and how long it takes.',
  ],
  [
    3,
    'How much time comes back',
    "3 What we'd fix",
    'The fix we recommend and when it is live.',
  ],
];

const ONSITE = [
  ['0 to 10 min', 'Walk through how work flows', 'bg-ink', 'min-h-10'],
  ['10 to 60 min', 'Watch the work and time the jobs', 'bg-accent', 'min-h-[200px]'],
  ['60 to 80 min', 'Ask who does what and why', 'bg-ink-2', 'min-h-20'],
  ['80 to 90 min', 'Agree what goes in the report', 'bg-ink', 'min-h-10'],
];

export default function HoursCheckPage() {
  return (
    <>
      <HoursMotion />
      <SiteHeader logoHref="/" links={NAV} />
      <main>
        <section id="top" className="overflow-hidden border-b border-line">
          <div className="shell grid grid-cols-[minmax(0,45fr)_minmax(0,55fr)] items-stretch gap-[clamp(32px,5vw,72px)] pb-0 pt-[clamp(56px,7vw,104px)] max-[760px]:grid-cols-1">
            <div className="flex flex-col gap-7 self-center pb-[clamp(48px,6vw,96px)]">
              <div data-d="1" className="hc-rise font-mono text-xs uppercase tracking-[.08em] text-ink-2">
                Free · 90 min on site or 60 min on a call
              </div>
              <h1 data-d="2" className="hc-rise m-0 text-balance font-display text-[clamp(38px,4.8vw,66px)] font-medium leading-[1.02] tracking-[-.035em]">
                Find out <span className="text-accent">what your admin costs</span>.
              </h1>
              <p data-d="3" className="hc-rise m-0 max-w-[42ch] text-pretty text-[clamp(17px,1.4vw,19px)] text-ink-2">
                We spend an hour or two with your team, then hand you a written report with a dollar figure on the hours you lose to admin.
              </p>
              <div data-d="4" className="hc-rise flex flex-wrap items-center gap-5">
                <a
                  href="#book"
                  className="cta inline-flex items-center gap-3 rounded-[2px] bg-accent px-6 py-4 text-base font-semibold text-accent-ink"
                >
                  Book a free Hours Check <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#report"
                  className="border-b border-line-strong pb-0.5 font-mono text-xs uppercase tracking-[.06em] text-ink-2 hover:text-ink"
                >
                  See the full report
                </a>
              </div>
            </div>
            <div data-hr="" className="relative h-[clamp(480px,46vw,600px)] overflow-hidden">
              <div data-peek="" aria-hidden="true" className="hc-peek absolute left-6 top-6 w-[80%] opacity-55">
                <HoursReport page={2} />
              </div>
              <div data-hrsheet="" className="hc-sheet relative w-[80%]">
                <HoursReport page={1} />
              </div>
            </div>
          </div>
        </section>

        <section id="report" data-hc="" className="border-b border-line bg-surface">
          <div className="shell grid grid-cols-[minmax(0,3fr)_minmax(0,9fr)] items-start gap-[clamp(32px,5vw,72px)] py-[clamp(72px,9vw,128px)] max-[760px]:grid-cols-1">
            <div className="flex flex-col gap-5">
              <div className="font-mono text-xs uppercase tracking-[.08em] text-ink-2">
                The report
              </div>
              <h2 className="m-0 text-balance font-display text-[clamp(28px,3.4vw,44px)] font-medium leading-[1.1] tracking-[-.025em]">
                Three pages. One number.
              </h2>
              <p className="m-0 font-mono text-[11.5px] leading-[1.6] text-ink-3">
                Example only. Numbers are for illustration, not a real client.
              </p>
            </div>
            <div data-sheets="" className="grid grid-cols-3 items-start gap-6">
              {SHEETS.map(([page, lead, title, body], index) => (
                <div key={page} data-stagger="" data-d={index + 1}>
                  <div data-hr="" className="h-12 font-mono text-[11.5px] uppercase tracking-[.06em] text-ink">
                    {lead}
                  </div>
                  <div className="relative mt-3.5">
                    <HoursReport page={page} />
                    {index === 0 ? (
                      <div
                        data-lead=""
                        aria-hidden="true"
                        className="absolute -top-3.5 left-[14%] z-[3] h-[calc(40%+14px)] w-px bg-accent"
                      >
                        <span className="absolute -bottom-[3px] -left-[3px] h-[7px] w-[7px] bg-accent" />
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-4 border-t border-line-strong pt-2.5">
                    <div className="font-mono text-xs uppercase tracking-[.06em] text-ink">
                      {title}
                    </div>
                    <div className="mt-1 text-[15px] text-ink-2">{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="check" data-hc="" data-plate="bg" className="border-b border-line">
          <div className="shell py-[clamp(72px,9vw,128px)]">
            <div className="mb-5 font-mono text-xs uppercase tracking-[.08em] text-ink-2">
              On the day
            </div>
            <h2 className="m-0 mb-[clamp(36px,5vw,64px)] max-w-[22ch] text-balance font-display text-[clamp(28px,3.4vw,44px)] font-medium leading-[1.1] tracking-[-.025em]">
              On site or on a call. Nothing to prepare.
            </h2>

            <div data-bars-d="" className="flex flex-col gap-7">
              <div>
                <div className="mb-3 font-mono text-xs uppercase tracking-[.06em] text-ink">
                  On site, 90 minutes
                </div>
                <div className="flex h-3 gap-0.5">
                  <div data-bar="" data-d="1" className="min-w-0 flex-[10] bg-ink" />
                  <div data-bar="" data-d="2" className="min-w-0 flex-[50] bg-accent" />
                  <div data-bar="" data-d="3" className="min-w-0 flex-[20] bg-ink-2" />
                  <div data-bar="" data-d="4" className="min-w-0 flex-[10] bg-ink" />
                </div>
                <div className="mt-3.5 grid grid-cols-[10fr_50fr_20fr_10fr]">
                  {ONSITE.map(([time, label]) => (
                    <div key={time} className="border-t border-line pr-3.5 pt-2.5">
                      <div className="font-mono text-xs text-ink-2">{time}</div>
                      <div className="mt-1 text-[15px] leading-[1.4]">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-2/3">
                <div className="mb-3 font-mono text-xs uppercase tracking-[.06em] text-ink">
                  Video call, 60 minutes
                </div>
                <div className="flex h-3 gap-0.5">
                  <div data-bar="" data-d="1" className="min-w-0 flex-[10] bg-ink" />
                  <div data-bar="" data-d="2" className="min-w-0 flex-[50] bg-accent" />
                  <div data-bar="" data-d="3" className="min-w-0 flex-[20] bg-ink-2" />
                  <div data-bar="" data-d="4" className="min-w-0 flex-[10] bg-ink" />
                </div>
                <div className="mt-3.5 grid grid-cols-[10fr_50fr_20fr_10fr] font-mono text-xs text-ink-2">
                  {['0 to 7', '7 to 40', '40 to 53', '53 to 60'].map((slot) => (
                    <div key={slot} className="border-t border-line pt-2.5">
                      {slot}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div data-bars-m="" className="hidden flex-col gap-9">
              <div>
                <div className="mb-3.5 font-mono text-xs uppercase tracking-[.06em] text-ink">
                  On site, 90 minutes
                </div>
                <div className="grid grid-cols-[6.75rem_12px_minmax(0,1fr)] gap-x-3">
                  {ONSITE.map(([time, label, bar, height], i) => (
                    <div key={time} className="contents">
                      <div className={`${height} whitespace-nowrap font-mono text-xs text-ink-2`}>{time}</div>
                      <div data-bar="" data-d={i + 1} className={`${bar} ${i < ONSITE.length - 1 ? 'border-b-2 border-bg' : ''}`} />
                      <div className="pb-2.5 text-[15px] leading-[1.35]">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-3.5 font-mono text-xs uppercase tracking-[.06em] text-ink">
                  Video call, 60 minutes
                </div>
                <div className="grid grid-cols-[6.75rem_12px_minmax(0,1fr)] gap-x-3 font-mono text-xs text-ink-2">
                  {[
                    ['0 to 7', 'bg-ink', 'min-h-[27px]'],
                    ['7 to 40', 'bg-accent', 'min-h-[133px]'],
                    ['40 to 53', 'bg-ink-2', 'min-h-[53px]'],
                    ['53 to 60', 'bg-ink', 'min-h-[27px]'],
                  ].map(([slot, bar, height], i, all) => (
                    <div key={slot} className="contents">
                      <div className={`${height} whitespace-nowrap`}>{slot}</div>
                      <div data-bar="" data-d={i + 1} className={`${bar} ${i < all.length - 1 ? 'border-b-2 border-bg' : ''}`} />
                      <div />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section data-hc="" data-plate="surface" className="border-b border-line bg-surface">
          <div className="shell grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-start gap-[clamp(40px,6vw,96px)] py-[clamp(72px,9vw,128px)] max-[760px]:grid-cols-1">
            <div className="flex flex-col gap-8">
              <div className="font-mono text-xs uppercase tracking-[.08em] text-ink-2">
                After the report
              </div>
              <h2 className="m-0 text-balance font-display text-[clamp(34px,4.6vw,62px)] font-medium leading-[1.04] tracking-[-.03em]">
                Keep the report, or have us build the fix
                <span className="text-accent">.</span>
              </h2>
              <figure className="m-0 flex max-w-[420px] flex-col gap-2.5">
                <FileFigure label="A folder with three tabs. The one under the pointer lifts." />
                <figcaption className="border-t border-line pt-2.5 font-mono text-[11.5px] text-ink-3">
                  fig. 01 — The report, and the three ways it can go.
                </figcaption>
              </figure>
            </div>
            <div className="flex flex-col border-b border-line pt-[clamp(0px,4vw,56px)]">
              {(
                [
                  ['01', 'Keep it', 'The report is yours. Use it however you like.'],
                  ['02', 'Have us build it', 'Fixed price quoted from the report, half to start and half once it is running smoothly.'],
                  ['03', 'Have us stay on', 'Monthly support, with a same-day reply.'],
                ] as const
              ).map(([num, title, body], index) => (
                <div
                  key={num}
                  data-stagger=""
                  data-d={index + 1}
                  className="grid grid-cols-[48px_minmax(0,1fr)] gap-4 border-t border-line py-[clamp(24px,3vw,36px)]"
                >
                  <span className="pt-2 font-mono text-[13px] text-ink-3">{num}</span>
                  <div>
                    <h3 className="m-0 mb-2.5 font-display text-[clamp(24px,2.4vw,32px)] font-medium leading-[1.15] tracking-[-.02em]">
                      {title}
                    </h3>
                    <p className="m-0 max-w-[44ch] text-ink-2">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" data-plate="bg" className="border-b border-line">
          <div className="shell grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center gap-[clamp(32px,5vw,80px)] py-[clamp(72px,9vw,128px)] max-[760px]:grid-cols-1">
            <div>
              <div className="mb-5 flex gap-3 font-mono text-xs uppercase tracking-[.08em] text-ink-2">
                <span className="text-accent">Questions</span>
              </div>
              <HoursFaq />
            </div>
            <FigureFrame
              name="query"
              label="A question mark that turns toward you"
              caption="fig. 02 — The questions, in the open."
            />
          </div>
        </section>

        <BookSection />
      </main>
      <SiteFooter />
    </>
  );
}
