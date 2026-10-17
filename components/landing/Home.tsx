import { FigureFrame } from '@/components/HairlineFigure';
import { HoursReport } from '@/components/HoursReport';
import { Mark } from '@/components/Wordmark';

const kicker =
  'mb-5 flex gap-3 font-mono text-xs uppercase tracking-[.08em] text-ink-2';
const h2 =
  'm-0 max-w-[20ch] text-balance font-display text-[clamp(28px,3.4vw,44px)] font-medium leading-[1.1] tracking-[-.025em]';
const lede =
  'm-0 max-w-[46ch] text-pretty text-[clamp(17px,1.5vw,20px)] text-ink-2';

const FAMILIAR = [
  ['a.', 'The same info typed into three different places'],
  ['b.', 'Paper timesheets or job sheets someone retypes every Friday'],
  ['c.', "Chasing invoices because nobody's sure what's been paid"],
  ['d.', '"Only Sarah knows how that spreadsheet works"'],
  ['e.', 'Paying for software nobody fully uses'],
];

const STEPS = [
  ['01', 'We show up.', 'A few hours on site, watching how the work really gets done.'],
  ['02', 'We map it.', 'A plain-English map of your systems, where the hours leak, and what fixing it is worth. Before you spend a cent on a build.'],
  ['03', 'We build it.', 'Fixed price, on the tools you already run. Documented, and your team trained to use it.'],
] as const;

const DAYS = [
  ['Mon', '75%', '7.5h'],
  ['Tue', '80%', '8.0h'],
  ['Wed', '65%', '6.5h'],
  ['Thu', '80%', '8.0h'],
  ['Fri', '50%', '5.0h'],
];

const RULES = [
  'Your accounts stay yours. We work in logins you create and can switch off anytime.',
  'Fixed price, in writing, before we build anything.',
  "Everything documented and handed over, so you're never stuck with us.",
];

const QUESTIONS = [
  ['Do we have to switch software?', "Almost never. We work with what you've got."],
  ['What does it cost?', 'The Hours Check and the written report are free. If you want something built, we quote a fixed price from the report. Half is paid to start and half once it\'s running smoothly.'],
  ['What if something breaks later?', 'Our monthly support plans cover it.'],
  ['Who can see our data?', 'Everything runs in accounts you own. We never use personal logins.'],
];

export function HomeHero() {
  return (
    <section id="top" data-plate="bg" className="border-b border-line">
      <div className="shell grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-center gap-[clamp(32px,5vw,80px)] py-[clamp(56px,8vw,112px)] max-[760px]:grid-cols-1">
        <div className="flex flex-col gap-7">
          <div className="font-mono text-xs uppercase tracking-[.08em] text-ink-2">
            Sydney engineers, on site
          </div>
          <h1 className="m-0 text-balance font-display text-[clamp(38px,5.4vw,72px)] font-medium leading-[1.02] tracking-[-.035em]">
            We find the hours your business loses to admin, and get them back
            <span className="text-accent">.</span>
          </h1>
          <p className="m-0 max-w-[50ch] text-pretty text-[clamp(17px,1.4vw,19px)] text-ink-2">
            We sit with your team, find the hours your business loses to admin, and get them back by connecting the tools you already pay for. Hours Check for the written report. TimeTally for digital timesheets. No new platform. No lock-in.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="#book"
              className="cta inline-flex items-center gap-3 rounded-[2px] bg-accent px-6 py-4 text-base font-semibold text-accent-ink"
            >
              Book a free Hours Check <span aria-hidden="true">→</span>
            </a>
            <a
              href="#how"
              className="border-b border-line-strong pb-0.5 font-mono text-xs uppercase tracking-[.06em] text-ink-2 hover:text-ink"
            >
              How we work
            </a>
          </div>
        </div>
        <FigureFrame
          name="branches"
          autoplay
          label="A commit graph: the history under the pointer rises"
          caption="fig. 01 — The tools you already pay for, patched together."
        />
      </div>
    </section>
  );
}

export function Familiar() {
  return (
    <section data-plate="surface" className="border-b border-line bg-surface">
      <div className="shell grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center gap-[clamp(32px,5vw,80px)] py-[clamp(72px,9vw,128px)] max-[760px]:grid-cols-1">
        <div>
          <div className={kicker}>
            <span className="text-accent">01</span>
            <span>Sound familiar?</span>
          </div>
          <div className="mb-[clamp(28px,3.4vw,44px)] flex flex-col gap-4">
            <h2 className={h2}>More software isn&apos;t the fix.</h2>
            <p className={lede}>When admin piles up, the instinct is to buy another app.</p>
            <p className={lede}>
              But most small businesses already pay for what they need. What&apos;s missing is the bit in between: the job typed into three places, the spreadsheet only one person understands.
            </p>
            <p className={lede}>
              Without it, a new app doesn&apos;t save time. It&apos;s just one more place to retype things.
            </p>
          </div>
          <div className="flex flex-col border-b border-line">
            {FAMILIAR.map(([mark, line]) => (
              <div
                key={mark}
                className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 border-t border-line py-[18px] font-display text-[clamp(19px,1.9vw,24px)] leading-[1.3] tracking-[-.01em]"
              >
                <span className="pt-1.5 font-mono text-xs text-ink-3">{mark}</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>
        <FigureFrame
          name="riffle"
          label="A tray of cards: the paperwork pile"
          caption="fig. 02 — Stash Labs connects what you already have. So the next app you buy actually gets used."
        />
      </div>
    </section>
  );
}

export function HowWeWork() {
  return (
    <section id="how" data-plate="bg" className="border-b border-line">
      <div className="shell py-[clamp(72px,9vw,128px)]">
        <div className={kicker}>
          <span className="text-accent">02</span>
          <span>How we work</span>
        </div>
        <div className="mb-[clamp(28px,3.4vw,44px)] flex flex-col gap-4">
          <h2 className={h2}>On site, not on a call.</h2>
          <p className={lede}>
            We don&apos;t send a report and disappear. We sit with your team and build it with them.
          </p>
        </div>
        <div className="grid grid-cols-2 items-start gap-[clamp(32px,5vw,80px)] max-[760px]:grid-cols-1">
          <div className="flex flex-col border-b border-line">
            {STEPS.map(([num, title, body]) => (
              <div
                key={num}
                className="grid grid-cols-[48px_minmax(0,1fr)] gap-4 border-t border-line py-[clamp(24px,3vw,36px)]"
              >
                <span className="pt-2 font-mono text-[13px] text-ink-3">{num}</span>
                <div>
                  <h3 className="m-0 mb-2.5 font-display text-[clamp(24px,2.4vw,32px)] font-medium leading-[1.15] tracking-[-.02em]">
                    {title}
                  </h3>
                  <p className="m-0 max-w-[46ch] text-ink-2">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div data-sticky="" className="sticky top-24 max-[760px]:static">
            <FigureFrame
              name="exploded"
              label="An app window taken apart into layers"
              caption="fig. 03 — Step 02: your systems, taken apart and laid out."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function StayOn() {
  return (
    <section data-plate="surface" className="border-b border-line bg-surface">
      <div className="shell grid grid-cols-2 items-center gap-[clamp(32px,5vw,80px)] py-[clamp(72px,9vw,128px)] max-[760px]:grid-cols-1">
        <FigureFrame
          name="slow"
          label="Crates moving along a belt: the work keeps moving"
          caption="fig. 04 — Fixed price up front. Documented at the end. Never stuck with us."
        />
        <div className="flex flex-col gap-6">
          <div className="flex gap-3 font-mono text-xs uppercase tracking-[.08em] text-ink-2">
            <span className="text-accent">03</span>
            <span>After the build</span>
          </div>
          <h2 className="m-0 font-display text-[clamp(32px,4vw,54px)] font-medium leading-[1.05] tracking-[-.03em]">
            Then we stay on.
          </h2>
          <p className="m-0 max-w-[40ch] text-pretty text-[clamp(17px,1.5vw,20px)] text-ink-2">
            Something breaks, or the business changes? We already know how it works. Your tech person, without the hire.
          </p>
        </div>
      </div>
    </section>
  );
}

export function HoursTeaser() {
  return (
    <section id="hours-report" data-plate="bg" className="border-b border-line">
      <div className="shell grid grid-cols-2 items-center gap-[clamp(32px,5vw,80px)] py-[clamp(72px,9vw,128px)] max-[760px]:grid-cols-1">
        <div className="flex flex-col gap-6">
          <div className="flex gap-3 font-mono text-xs uppercase tracking-[.08em] text-ink-2">
            <span className="text-accent">04</span>
            <span>The Hours Report</span>
          </div>
          <h2 className="m-0 text-balance font-display text-[clamp(32px,4vw,54px)] font-medium leading-[1.05] tracking-[-.03em]">
            Three pages. One number
            <span className="text-accent">.</span>
          </h2>
          <p className="m-0 max-w-[40ch] text-pretty text-[clamp(17px,1.5vw,20px)] text-ink-2">
            A free Hours Check, on site or on a call, ends with a written report that puts a dollar figure on the hours you lose to admin.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-5">
            <a
              href="/hours-check#book"
              className="cta inline-flex items-center gap-3 rounded-[2px] bg-accent px-6 py-4 text-base font-semibold text-accent-ink"
            >
              Book a free Hours Check <span aria-hidden="true">→</span>
            </a>
            <a
              href="/hours-check#report"
              className="border-b border-line-strong pb-0.5 font-mono text-xs uppercase tracking-[.06em] text-ink-2 hover:text-ink"
            >
              See the full report
            </a>
          </div>
        </div>
        <figure className="m-0 flex flex-col gap-3.5">
          <div className="relative pb-6">
            <div aria-hidden="true" className="absolute left-6 top-6 w-[84%] opacity-55">
              <HoursReport page={2} />
            </div>
            <div className="relative w-[84%]">
              <HoursReport page={1} />
            </div>
          </div>
          <figcaption className="border-t border-line pt-2.5 font-mono text-[11.5px] text-ink-3">
            Example only. Numbers are for illustration, not a real client.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Products() {
  return (
    <section id="products" className="border-b border-line">
      <div className="shell py-[clamp(72px,9vw,128px)]">
        <div className="mb-[clamp(32px,4vw,56px)]">
          <div className={kicker}>
            <span className="text-accent">05</span>
            <span>Products</span>
          </div>
          <h2 className={`${h2} max-w-[22ch]`}>Some fixes are worth building twice.</h2>
          <p className={`${lede} mt-4`}>
            When we see the same problem at business after business, we turn the fix into a product anyone can use. TimeTally is the first.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <a
            href="https://www.timetally.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] overflow-hidden rounded-[2px] border border-line-strong bg-surface text-ink transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,.35)] max-[760px]:grid-cols-1"
          >
            <div className="flex flex-col justify-between gap-12 p-[clamp(24px,3.4vw,44px)]">
              <div className="flex items-center gap-2.5 font-mono text-[11.5px] uppercase tracking-[.08em] text-ink-2">
                <span className="h-[7px] w-[7px] rounded-full bg-accent" />
                <span>01 · Live</span>
              </div>
              <div className="flex flex-col gap-3.5">
                <h3 className="m-0 font-wordmark text-[clamp(44px,5.4vw,76px)] font-extrabold leading-[.95] tracking-[-.04em]">
                  TimeTally
                </h3>
                <span className="inline-flex items-center gap-[7px] text-sm text-ink-2">
                  by
                  <Mark className="h-3.5 w-3.5" />
                  <span className="font-wordmark font-extrabold tracking-[-.03em] text-ink">
                    stash
                    <span className="ml-[.24em] font-normal">labs</span>
                  </span>
                </span>
                <p className="m-0 mt-2 max-w-[30ch] text-[clamp(17px,1.5vw,20px)] text-ink-2">
                  Digital timesheets for Australian businesses.
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2.5 border-b border-accent pb-[3px] font-mono text-xs uppercase tracking-[.06em] text-ink">
                Visit timetally.com.au ↗
              </span>
            </div>
            <div aria-hidden="true" className="flex items-center border-l border-line bg-bg p-[clamp(24px,3.4vw,44px)] max-[760px]:border-l-0 max-[760px]:border-t">
              <div className="w-full border border-line-strong bg-surface font-mono text-xs text-ink">
                <div className="flex justify-between gap-3 border-b border-line-strong px-4 py-3 text-[11px] uppercase tracking-[.06em] text-ink-2">
                  <span>Timesheet · this week</span>
                  <span className="text-accent">● Submitted</span>
                </div>
                <div className="px-4 pt-1">
                  {DAYS.map(([day, width, hours]) => (
                    <div
                      key={day}
                      className="grid grid-cols-[44px_minmax(0,1fr)_52px] items-center gap-3.5 border-t border-line py-[11px]"
                    >
                      <span className="text-ink-3">{day}</span>
                      <div className="h-1.5 bg-line">
                        <div className="h-full bg-ink" style={{ width }} />
                      </div>
                      <span className="text-right">{hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-1 flex justify-between gap-3 border-t border-line-strong px-4 py-3">
                  <span className="text-ink-2">Week total</span>
                  <span>35.0h</span>
                </div>
              </div>
            </div>
          </a>
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-[2px] border border-dashed border-line-strong px-[clamp(24px,3.4vw,44px)] py-[18px] font-mono text-[11.5px] uppercase tracking-[.08em] text-ink-3">
            <span>02 · Next product</span>
            <span>In build</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Who() {
  return (
    <section data-plate="surface" className="border-b border-line bg-surface">
      <div className="shell grid grid-cols-2 gap-[clamp(32px,5vw,80px)] py-[clamp(72px,9vw,128px)] max-[760px]:grid-cols-1">
        <div>
          <div className={kicker}>
            <span className="text-accent">06</span>
            <span>Who we are</span>
          </div>
          <h2 className={h2}>
            Three Sydney engineers across business systems, web, and hardware.
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-7">
          <p className="m-0 max-w-[40ch] text-[clamp(17px,1.5vw,20px)] text-ink-2">
            We started Stash Labs to build the tech we wished existed.
          </p>
          <p className="m-0 max-w-[40ch] text-[clamp(17px,1.5vw,20px)] text-ink-2">
            We&apos;re new, and we run Stash Labs alongside our day jobs. So we take on a few clients at a time, and each one gets us, not a junior.
          </p>
          <div className="flex flex-col border-b border-line font-mono text-[13px]">
            {[
              ['Business systems', '01'],
              ['Web', '02'],
              ['Hardware', '03'],
            ].map(([label, num]) => (
              <div
                key={num}
                className="flex justify-between gap-4 border-t border-line py-3"
              >
                <span>{label}</span>
                <span className="text-ink-3">{num}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="shell grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center gap-[clamp(32px,5vw,80px)] border-t border-line-strong pb-[clamp(72px,9vw,128px)] pt-[clamp(32px,4vw,56px)] max-[760px]:grid-cols-1">
        <div>
          <div className="mb-5 font-mono text-xs uppercase tracking-[.08em] text-ink-2">
            How we treat your business
          </div>
          <div className="flex flex-col border-b border-line">
            {RULES.map((rule) => (
              <div
                key={rule}
                className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 border-t border-line py-[18px] font-display text-[clamp(18px,1.7vw,22px)] leading-[1.35] tracking-[-.01em]"
              >
                <span className="pt-[5px] font-mono text-xs text-accent">→</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
        <FigureFrame
          name="padlock"
          intensity={0.4}
          label="A padlock: your accounts stay yours and you can switch our access off anytime"
          caption="fig. 05 — Your logins. Your switch."
        />
      </div>
    </section>
  );
}

export function HomeFaq() {
  return (
    <section id="faq" data-plate="bg" className="border-b border-line">
      <div className="shell grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center gap-[clamp(32px,5vw,80px)] py-[clamp(72px,9vw,128px)] max-[760px]:grid-cols-1">
        <div>
          <div className={kicker}>
            <span className="text-accent">07</span>
            <span>Questions</span>
          </div>
          <div className="flex flex-col border-b border-line">
            {QUESTIONS.map(([q, a]) => (
              <div key={q} className="border-t border-line py-[22px]">
                <h3 className="m-0 mb-1.5 font-display text-[clamp(19px,1.8vw,23px)] font-medium leading-[1.25] tracking-[-.01em]">
                  {q}
                </h3>
                <p className="m-0 text-ink-2">{a}</p>
              </div>
            ))}
          </div>
        </div>
        <FigureFrame
          name="query"
          label="A question mark that turns toward you"
          caption="fig. 06 — The questions, in the open."
        />
      </div>
    </section>
  );
}
