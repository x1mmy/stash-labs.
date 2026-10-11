'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { CARD_PATH } from '@/lib/card';

/** Full-screen entry overlay on every load. Unmounts when the hold-then-fade ends. */
export function Intro() {
  const [done, setDone] = useState(false);
  // Someone who just tapped an NFC tag wants the card, not two seconds of logo.
  const skip = usePathname() === CARD_PATH;
  if (done || skip) return null;

  return (
    <div
      className="sl-intro"
      aria-hidden="true"
      // The logo parts' own animations bubble up here; only the overlay's
      // fade-out means we are finished.
      onAnimationEnd={(e) => e.target === e.currentTarget && setDone(true)}
    >
      <div className="inline-flex items-center gap-[clamp(12px,1.6vw,22px)]">
        <svg
          viewBox="0 0 100 100"
          className="h-[clamp(52px,6vw,84px)] w-[clamp(52px,6vw,84px)] overflow-visible"
        >
          <polygon data-ld="1" points="88,8 24,32 24,50 88,26" fill="currentColor" />
          <polygon data-ld="2" points="24,32 76,52 76,70 24,50" fill="var(--accent)" />
          <polygon data-ld="3" points="76,52 12,76 12,94 76,70" fill="currentColor" />
        </svg>
        <span className="inline-flex items-baseline font-brand text-[clamp(40px,4.6vw,64px)] font-extrabold leading-none tracking-[-.04em]">
          <span data-ld="4" className="inline-flex items-baseline">
            stash
            <span className="ml-[.24em] font-normal tracking-[-.02em]">labs</span>
          </span>
          <svg
            data-ld="5"
            viewBox="0 0 13 14"
            className="ml-[3px] h-[.23em] w-[.22em] overflow-visible"
          >
            <polygon points="0,0 13,5 13,14 0,9" fill="var(--accent)" />
          </svg>
        </span>
      </div>
    </div>
  );
}
