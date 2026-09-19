const HERO_ROWS = [
  { width: '54%', delay: '0s' },
  { width: '78%', delay: '.22s' },
  { width: '41%', delay: '.44s' },
  { width: '88%', delay: '.66s' },
  { width: '66%', delay: '.88s' },
];

export function Hero() {
  return (
    <section
      id="top"
      className="shell pb-[clamp(40px,6vw,72px)] pt-[clamp(56px,9vw,120px)]"
    >
      <div className="mb-[clamp(32px,5vw,56px)] flex items-center gap-3.5 font-mono text-[11.5px] uppercase tracking-[.1em] text-ink-2 max-[680px]:flex-wrap max-[680px]:gap-x-3 max-[680px]:gap-y-1.5">
        <span className="h-[7px] w-[7px] rounded-full bg-accent [animation:blink_2.4s_ease-in-out_infinite]" />
        <span>Sydney, AU</span>
        <span className="h-px flex-1 bg-[var(--line)] max-[680px]:hidden" />
        <span>Taking on two builds this quarter</span>
      </div>

      <h1 className="m-0 text-balance text-[clamp(46px,8.4vw,126px)] font-semibold leading-[.94] tracking-[-.035em]">
        <span className="block [animation:riseIn_.9s_cubic-bezier(.16,1,.3,1)_both]">
          Software for the
        </span>
        <span className="block [animation:riseIn_.9s_cubic-bezier(.16,1,.3,1)_.12s_both]">
          businesses that keep
        </span>
        <span className="block [animation:riseIn_.9s_cubic-bezier(.16,1,.3,1)_.24s_both]">
          the lights on
          <span className="font-serif font-normal italic text-accent">.</span>
        </span>
      </h1>

      <div className="mt-[clamp(36px,5vw,64px)] grid items-end gap-[clamp(24px,4vw,64px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
        <p className="m-0 max-w-[46ch] text-[clamp(17px,1.5vw,21px)] leading-[1.5] text-ink-2 [animation:riseIn_.9s_cubic-bezier(.16,1,.3,1)_.4s_both]">
          Stash Labs is a three-person software studio in Sydney. We build
          products for Australian small businesses (the ones enterprise
          software was never designed for) and websites for the businesses that
          need one properly.
        </p>
        <div className="flex flex-wrap gap-3 [animation:riseIn_.9s_cubic-bezier(.16,1,.3,1)_.5s_both]">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 rounded-full bg-accent px-[26px] py-[15px] text-[15px] font-semibold text-accent-ink transition-transform hover:-translate-y-0.5 max-[680px]:flex-[1_1_100%] max-[680px]:justify-center"
          >
            Tell us the problem <span className="font-mono">→</span>
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2.5 rounded-full border border-line-strong px-[26px] py-[15px] text-[15px] font-semibold text-ink transition-colors hover:bg-surface max-[680px]:flex-[1_1_100%] max-[680px]:justify-center"
          >
            See the work
          </a>
        </div>
      </div>

      <div
        data-reveal
        className="mt-[clamp(48px,7vw,96px)] overflow-hidden rounded border border-line bg-surface"
      >
        <div
          data-hero-art
          className="relative flex min-h-[230px] items-center overflow-hidden [aspect-ratio:21/9] [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:52px_52px] max-[680px]:[aspect-ratio:4/3] max-[420px]:[aspect-ratio:auto]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute bottom-0 top-0 w-[24%] bg-[linear-gradient(90deg,transparent,var(--accent),transparent)] opacity-[.14] [animation:sweepX_7s_linear_infinite]" />
          </div>

          <div className="relative flex w-full flex-col gap-[clamp(9px,1.4vw,18px)] p-[clamp(20px,3.4vw,44px)]">
            {HERO_ROWS.map((row) => (
              <div
                key={row.delay}
                className="grid items-center gap-[clamp(10px,1.6vw,20px)] [grid-template-columns:clamp(58px,8vw,110px)_minmax(0,1fr)_20px]"
              >
                <div className="h-[9px] rounded-sm bg-surface-2" />
                <div className="h-[9px] overflow-hidden rounded-sm bg-surface-2">
                  <div
                    className="h-full origin-left bg-accent [animation:fillRow_6s_cubic-bezier(.16,1,.3,1)_infinite]"
                    style={{ width: row.width, animationDelay: row.delay }}
                  />
                </div>
                <div
                  className="font-mono text-xs text-accent [animation:popTick_6s_ease_infinite]"
                  style={{ animationDelay: row.delay }}
                >
                  ✓
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-[clamp(12px,1.6vw,20px)] right-[clamp(14px,2vw,24px)] font-mono text-[11px] uppercase tracking-[.1em] text-ink-3">
            pay run · approved
          </div>
        </div>
      </div>

      <p className="mx-0.5 mb-0 mt-3 font-mono text-[11.5px] tracking-[.06em] text-ink-3">
        <span className="text-accent">fig. 1</span> &nbsp;One product live, one
        in build, client sites shipping.
      </p>
    </section>
  );
}
