import { Figure } from '@/components/Figure';
import { SectionLabel } from '@/components/SectionLabel';

const QUESTIONS = [
  {
    q: 'Do we have to switch software?',
    a: "Almost never. We work with what you've got.",
  },
  {
    q: 'What does it cost?',
    a: 'The first chat is free. The audit is a fixed fee, and it comes off the build if you go ahead.',
  },
  {
    q: 'What if something breaks later?',
    a: 'Our monthly support plans cover it.',
  },
  {
    q: 'Who can see our data?',
    a: 'Everything runs in accounts you own. We never use personal logins.',
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-b border-line">
      <div className="shell split section-pad items-center [grid-template-columns:minmax(0,1.1fr)_minmax(0,1fr)]">
        <div>
          <div className="mb-5">
            <SectionLabel num="06">Questions</SectionLabel>
          </div>
          <div className="flex flex-col border-b border-line">
            {QUESTIONS.map(({ q, a }) => (
              <div key={q} className="border-t border-line py-[22px]">
                <h3 className="m-0 mb-1.5 font-display text-[clamp(19px,1.8vw,23px)] font-medium leading-tight tracking-[-.01em]">
                  {q}
                </h3>
                <p className="m-0 text-ink-2">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <Figure
          name="padlock"
          plate="bg"
          label="A padlock: your data and access stay yours"
          caption="fig. 05 — Your accounts, your data."
        />
      </div>
    </section>
  );
}
