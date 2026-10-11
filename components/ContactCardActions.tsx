'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CARD, CARD_URL, QR_PATH, VCARD_PATH } from '@/lib/card';

const outlineClass =
  'inline-flex flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-sm border border-line-strong bg-transparent px-6 py-4 font-sans text-base font-semibold text-ink transition-colors hover:border-ink';

const quietClass =
  'link-rule cursor-pointer border-0 bg-transparent p-0 font-mono text-xs uppercase tracking-[.06em] text-ink-2 hover:text-ink';

/** Save, share and QR: the ways the card leaves the screen it is on. */
export function ContactCardActions() {
  const [copied, setCopied] = useState(false);
  const [qr, setQr] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  // Phones get their own share sheet (Messages, WhatsApp, AirDrop...). Where
  // there is none, mostly desktop, the link goes on the clipboard instead.
  async function share() {
    try {
      if (navigator.share) {
        // Link only: extra text lands in Messages as a second, noisier bubble.
        await navigator.share({ title: CARD.name, url: CARD_URL });
      } else {
        await navigator.clipboard.writeText(CARD_URL);
        setCopied(true);
      }
    } catch {
      /* closing the share sheet rejects too - nothing to report */
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {qr && (
        <div className="flex items-center gap-4 rounded-sm border border-line bg-surface-2 p-3">
          <Image
            src={QR_PATH}
            alt={`QR code linking to ${CARD_URL}`}
            width={132}
            height={132}
            unoptimized
            className="h-[132px] w-[132px] shrink-0 rounded-sm"
          />
          <p className="m-0 text-[15px] leading-normal text-ink-2">
            Point a phone camera here to open this card.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {/* A plain link, no download attribute: phones open the .vcf in Contacts. */}
        <a href={VCARD_PATH} className="btn-primary flex-1 justify-center whitespace-nowrap">
          Save contact{' '}
          <span aria-hidden="true" className="arrow">
            →
          </span>
        </a>
        <button type="button" onClick={share} className={outlineClass}>
          <span aria-live="polite">{copied ? 'Link copied' : 'Share'}</span>
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setQr(!qr)}
          aria-expanded={qr}
          className={quietClass}
        >
          {qr ? 'Hide QR code' : 'Show QR code'}
        </button>
        <Link href="/#book" className={quietClass}>
          Book a chat{' '}
          <span aria-hidden="true" className="arrow">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
