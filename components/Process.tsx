import { SectionLabel } from '@/components/SectionLabel';

const RULES = [
  {
    title: 'Validation first, ego second',
    body: 'We talk to businesses before we write anything. A lot of them, for longer than is comfortable.',
  },
  {
    title: 'Direct relationships',
    body: 'No sales team, no gatekeeping, no ticket queue. You talk to whoever is building the thing.',
  },
  {
    title: 'No feature bloat',
    body: 'One problem solved well beats five solved badly. Most requests get a no, and that is the point.',
  },
  {
    title: 'Your feedback is the roadmap',
    body: 'Beta customers decide what gets built next. Not marketing, not a strategy deck, not us.',
  },
];

export function Process() {
  return (
    <section id="process" className="border-t border-line bg-surface">
      <div className="shell py-[clamp(72px,10vw,150px)]">
        <div className="mb-[clamp(32px,4vw,60px)] flex flex-wrap items-baseline justify-between gap-5">
          <div data-reveal>
            <SectionLabel num="07.">How we work</SectionLabel>
          </div>
          <h2
            data-reveal
            className="m-0 max-w-[16ch] text-[clamp(28px,3.6vw,50px)] font-semibold leading-[1.08] tracking-[-.025em]"
          >
            Four rules, no exceptions
          </h2>
        </div>

        <div className="flex flex-col">
          {RULES.map((rule, i) => (
            <div
              key={rule.title}
              data-reveal
              className={`grid items-baseline gap-[clamp(12px,3vw,48px)] border-t border-line-strong py-[clamp(20px,2.6vw,34px)] [grid-template-columns:minmax(0,56px)_minmax(0,1.1fr)_minmax(0,1.2fr)] max-[680px]:gap-1.5 max-[680px]:py-[22px] max-[680px]:[grid-template-columns:minmax(0,1fr)] ${
                i === RULES.length - 1 ? 'border-b border-b-line-strong' : ''
              }`}
            >
              <span className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="m-0 text-[clamp(19px,2.1vw,28px)] font-semibold leading-[1.2] tracking-[-.02em]">
                {rule.title}
              </h3>
              <p className="m-0 text-base leading-[1.6] text-ink-2">{rule.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
