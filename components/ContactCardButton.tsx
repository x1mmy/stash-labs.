'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ContactCard } from '@/components/ContactCard';
import { CARD_PATH } from '@/lib/card';

/**
 * Header trigger for the contact card: an icon that widens into its label
 * once the pointer has rested on it for half a second. It is a real link to
 * /card, so it still works without JS and on a new-tab click; a plain click
 * opens the popup instead.
 */
const HOVER_DELAY_MS = 500;

export function ContactCardButton() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // The label only opens for a pointer that has rested on the icon, not one
  // passing over it on the way to "Book a chat".
  useEffect(() => {
    if (!hovered) return setExpanded(false);
    const timer = setTimeout(() => setExpanded(true), HOVER_DELAY_MS);
    return () => clearTimeout(timer);
  }, [hovered]);

  return (
    <>
      <Link
        href={CARD_PATH}
        aria-label="Contact card"
        aria-haspopup="dialog"
        data-expanded={expanded}
        // Mouse only: a tap also fires pointerenter, and on a touch screen the
        // label would open with nothing to close it.
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          dialog.current?.showModal();
        }}
        className="group flex items-center whitespace-nowrap rounded-sm border border-line-strong p-[9px] text-ink-2 max-[349px]:hidden transition-colors duration-200 hover:border-ink hover:text-ink"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          aria-hidden="true"
        >
          <rect x="1.5" y="3" width="13" height="10" rx="1" />
          <circle cx="5.5" cy="7" r="1.4" />
          <path d="M3.4 10.6c.4-1 1.1-1.5 2.1-1.5s1.7.5 2.1 1.5M9.6 6.5h3M9.6 9.5h3" />
        </svg>
        {/* The label slides out of the icon once the pointer has rested there
            for HOVER_DELAY_MS. On touch it stays an icon; the aria-label names it. */}
        <span
          aria-hidden="true"
          className="max-w-0 overflow-hidden opacity-0 transition-[max-width,margin,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-focus-visible:ml-2 group-focus-visible:max-w-[10em] group-focus-visible:opacity-100 group-data-[expanded=true]:ml-2 group-data-[expanded=true]:max-w-[10em] group-data-[expanded=true]:opacity-100"
        >
          Contact card
        </span>
      </Link>

      {/* It sits inside the nav in the DOM, so undo the nav's mono caps. */}
      <dialog
        ref={dialog}
        aria-label="Stash Labs contact card"
        // The dialog box is all padding-free content, so a click that lands on
        // the dialog element itself is a click on the backdrop. Following the
        // card's "Book a chat" link should also get the popup out of the way.
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target === e.currentTarget || target.closest('a[href^="/#"]')) {
            e.currentTarget.close();
          }
        }}
        className="m-auto max-h-[calc(100dvh-32px)] w-[min(440px,calc(100vw-32px))] overflow-auto rounded-sm border border-line-strong bg-bg p-0 font-sans normal-case tracking-normal text-ink backdrop:bg-black/55 open:[animation:riseIn_.35s_cubic-bezier(.16,1,.3,1)_both]"
      >
        <div className="relative">
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close contact card"
            className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border border-line-strong bg-transparent font-mono text-sm text-ink-2 transition-colors duration-200 hover:border-ink hover:text-ink"
          >
            ✕
          </button>
          <ContactCard />
        </div>
      </dialog>
    </>
  );
}
