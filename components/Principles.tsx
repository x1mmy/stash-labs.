import { SectionLabel } from '@/components/SectionLabel';

const PRINCIPLES = [
  {
    title: 'Small businesses deserve better tools',
    body: 'Enterprise software is over-engineered and priced accordingly. An SMB needs something that fits the way it actually works.',
  },
  {
    title: 'We are not guessing',
    body: 'We write the code, we sit with the customers, and we change the product when they tell us it is wrong.',
  },
  {
    title: 'Simple beats complex',
    body: 'One problem solved properly, with no learning curve, beats five solved halfway behind a settings menu.',
  },
  {
    title: 'Australian businesses first',
    body: 'Built for local regulation and local practice, rather than a global tool with an AU setting bolted on.',
  },
];

export function Principles() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="shell py-[clamp(72px,10vw,150px)]">
        <div data-reveal className="mb-[clamp(28px,4vw,52px)]">
          <SectionLabel num="05.">What we hold to</SectionLabel>
        </div>

        {/* Fixed 2×2 rather than auto-fit: four cards across three auto-fit
            columns left the last one stranded beside two empty cells. */}
        <div className="grid gap-x-[clamp(28px,5vw,72px)] gap-y-0 [grid-template-columns:minmax(0,1fr)] min-[681px]:[grid-template-columns:repeat(2,minmax(0,1fr))]">
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.title}
              data-reveal
              className="border-t border-line-strong py-[clamp(20px,2.5vw,32px)]"
            >
              <div className="mb-3.5 font-mono text-[11px] text-accent">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="m-0 mb-3 text-[clamp(20px,2vw,26px)] font-semibold leading-[1.2] tracking-[-.02em]">
                {p.title}
              </h3>
              <p className="m-0 max-w-[40ch] text-base leading-[1.6] text-ink-2">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
