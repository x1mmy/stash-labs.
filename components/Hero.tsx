import { Figure } from '@/components/Figure';

export function Hero() {
  return (
    <section id="top" className="border-b border-line">
      <div className="shell split items-center py-[clamp(56px,8vw,112px)] [grid-template-columns:minmax(0,1.05fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-7">
          <div className="eyebrow">Sydney engineers, on site</div>
          <h1 className="m-0 text-balance font-display text-[clamp(38px,5.4vw,72px)] font-medium leading-[1.02] tracking-[-.035em]">
            We find the hours your business loses to admin, and get them back
            <span className="text-accent">.</span>
          </h1>
          <p className="m-0 max-w-[50ch] text-pretty text-[clamp(17px,1.4vw,19px)] text-ink-2">
            We sit with your team, find where the hours go, and connect the
            tools you already pay for. No new platform. No lock-in.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#book" className="btn-primary">
              Book a free 30-min systems chat{' '}
              <span aria-hidden="true" className="arrow">
                →
              </span>
            </a>
            <a
              href="#how"
              className="border-b border-line-strong pb-0.5 font-mono text-xs uppercase tracking-[.06em] text-ink-2 transition-colors duration-200 hover:text-ink"
            >
              How we work
            </a>
          </div>
        </div>

        <Figure
          name="branches"
          plate="bg"
          autoplay
          caption="fig. 01 — The tools you already pay for, patched together."
        />
      </div>
    </section>
  );
}
