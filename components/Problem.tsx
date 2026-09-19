import { SectionLabel } from '@/components/SectionLabel';

export function Problem() {
  return (
    <section className="shell py-[clamp(72px,10vw,150px)]">
      <div className="grid gap-[clamp(28px,5vw,80px)] [grid-template-columns:minmax(0,1fr)_minmax(0,2.1fr)] max-[680px]:[grid-template-columns:minmax(0,1fr)]">
        {/* Label top, pull-quote bottom, so the narrow column carries weight
            instead of leaving a blank quadrant beside the copy. `contents`
            drops the wrapper on mobile so both land in the single-column flow. */}
        <div className="flex flex-col justify-between gap-[clamp(32px,4vw,56px)] max-[680px]:contents">
          <div data-reveal>
            <SectionLabel num="02.">The problem</SectionLabel>
          </div>

          <p
            data-reveal
            className="m-0 max-w-[22ch] font-serif text-[clamp(20px,2.2vw,30px)] leading-[1.25] tracking-[-.01em] text-ink max-[680px]:order-last max-[680px]:mt-[clamp(32px,4vw,52px)]"
          >
            We build the tools we wished existed while working these jobs
            ourselves.
          </p>
        </div>

        <div>
          <h2
            data-reveal
            className="m-0 mb-[clamp(24px,3vw,40px)] max-w-[20ch] text-balance text-[clamp(30px,4.2vw,58px)] font-semibold leading-[1.08] tracking-[-.025em]"
          >
            Small businesses run on software built for somebody else
            <span className="text-accent">.</span>
          </h2>

          <div className="grid gap-[clamp(20px,3vw,44px)] text-[clamp(16px,1.35vw,18px)] leading-[1.62] text-ink-2 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
            <p data-reveal className="m-0">
              A cafe owner does not need a supply-chain platform. A shop with
              nine staff does not need an HR suite. What they get instead is
              enterprise software with the price and complexity to match, or a
              spreadsheet and a Sunday afternoon.
            </p>
            <p data-reveal className="m-0">
              We pick one of those jobs at a time and build the tool that does
              it. Nothing else. Australian rules, Australian pay cycles, priced
              for a business that counts its margins weekly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
