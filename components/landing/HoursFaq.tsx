'use client';

import { useState } from 'react';

const QUESTIONS: [string, string][] = [
  [
    'Is it really free?',
    'Yes. The Hours Check and the written report cost nothing, and you keep the report whatever you decide.',
  ],
  [
    'Do we have to switch software?',
    'Almost never. We work with the tools you already pay for.',
  ],
  [
    'What do you need from us?',
    'Ninety minutes of your time on site, or sixty on a call, and the people who do the work. There is nothing to prepare.',
  ],
  [
    'Who can see our data?',
    'Everything runs in accounts you own. We never use personal logins.',
  ],
  [
    'Can my accountant be involved?',
    'Yes. Bring them to the visit or the call, or send them the report afterwards.',
  ],
  [
    "What if there's nothing worth fixing?",
    'Then the report says so and you keep it. That is still a useful answer.',
  ],
];

export function HoursFaq() {
  const [open, setOpen] = useState(-1);

  return (
    <div className="flex flex-col">
      {QUESTIONS.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={q} className="border-t border-line">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full cursor-pointer items-baseline justify-between gap-4 border-0 bg-transparent py-5 text-left font-display text-[clamp(19px,1.8vw,23px)] font-medium leading-[1.25] tracking-[-.01em] text-ink"
            >
              <span>{q}</span>
              <span aria-hidden="true" className="font-mono text-base text-ink-2">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="m-0 mb-[22px] max-w-[46ch] text-ink-2">{a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
