import { Figure } from '@/components/Figure';
import { SectionLabel } from '@/components/SectionLabel';

const STEPS = [
  {
    title: 'We show up.',
    body: 'A few hours on site, watching how the work really gets done.',
  },
  {
    title: 'We map it.',
    body: 'A plain-English map of your systems, where the hours leak, and what fixing it is worth. Before you spend a cent on a build.',
  },
  {
    title: 'We build it.',
    body: 'Fixed price, on the tools you already run. Documented, and your team trained to use it.',
  },
];

export function Process() {
  return (
    <section id="how" className="border-b border-line">
      <div className="shell section-pad">
        <div className="mb-5">
          <SectionLabel num="02">How we work</SectionLabel>
        </div>
        <div className="mb-[clamp(28px,3.4vw,44px)] flex flex-col gap-4">
          <h2 className="h2 max-w-[20ch]">On site, not on a call.</h2>
          <p className="lede max-w-[46ch]">
            We don&apos;t send a report and disappear. We sit with your team and
            build it with them.
          </p>
        </div>

        <div className="split items-start grid-cols-2">
          <div className="flex flex-col border-b border-line">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                // Step 02 is the one the figure illustrates, so its rule is inked.
                className={`grid gap-4 border-t py-[clamp(24px,3vw,36px)] [grid-template-columns:48px_minmax(0,1fr)] ${
                  i === 1 ? 'border-ink' : 'border-line'
                }`}
              >
                <span className="pt-2 font-mono text-[13px] text-ink-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="m-0 mb-2.5 font-display text-[clamp(24px,2.4vw,32px)] font-medium leading-[1.15] tracking-[-.02em]">
                    {step.title}
                  </h3>
                  <p className="m-0 max-w-[46ch] text-ink-2">{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          <Figure
            name="exploded"
            plate="bg"
            label="An app window taken apart into layers"
            caption="fig. 03 — Step 02: your systems, taken apart and laid out."
            className="sticky top-24 max-[760px]:static"
          />
        </div>
      </div>
    </section>
  );
}
