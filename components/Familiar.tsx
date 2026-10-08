import { Figure } from '@/components/Figure';
import { SectionLabel } from '@/components/SectionLabel';

const SYMPTOMS = [
  'The same info typed into three different places',
  'Paper timesheets or job sheets someone retypes every Friday',
  "Chasing invoices because nobody's sure what's been paid",
  '"Only Sarah knows how that spreadsheet works"',
  'Paying for software nobody fully uses',
];

export function Familiar() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="shell split section-pad items-center [grid-template-columns:minmax(0,1.1fr)_minmax(0,1fr)]">
        <div>
          <div className="mb-5">
            <SectionLabel num="01">Sound familiar?</SectionLabel>
          </div>

          <div className="mb-[clamp(28px,3.4vw,44px)] flex flex-col gap-4">
            <h2 className="h2 max-w-[20ch]">More software isn&apos;t the fix.</h2>
            <p className="lede max-w-[46ch]">
              When admin piles up, the instinct is to buy another app.
            </p>
            <p className="lede max-w-[46ch]">
              But most small businesses already pay for what they need.
              What&apos;s missing is the bit in between: the job typed into
              three places, the spreadsheet only one person understands.
            </p>
            <p className="lede max-w-[46ch]">
              Without it, a new app doesn&apos;t save time. It&apos;s just one
              more place to retype things.
            </p>
          </div>

          <div className="flex flex-col border-b border-line">
            {SYMPTOMS.map((text, i) => (
              <div
                key={text}
                className="grid gap-3 border-t border-line py-[18px] font-display text-[clamp(19px,1.9vw,24px)] leading-[1.3] tracking-[-.01em] [grid-template-columns:32px_minmax(0,1fr)]"
              >
                <span className="pt-1.5 font-mono text-xs tracking-normal text-ink-3">
                  {String.fromCharCode(97 + i)}.
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <Figure
          name="riffle"
          plate="surface"
          label="A tray of cards: the paperwork pile"
          caption="fig. 02 — Stash Labs connects what you already have. So the next app you buy actually gets used."
        />
      </div>
    </section>
  );
}
