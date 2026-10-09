import Link from 'next/link';
import { LogoMark } from '@/components/Logo';
import { CARD, VCARD_PATH } from '@/lib/card';

const rowClass = 'flex justify-between gap-4 border-t border-line py-3';
const valueClass = 'link-rule font-mono text-[12.5px] text-ink';

/** The card itself. Shared by the header popup and the standalone /card page. */
export function ContactCard({ heading: Heading = 'h2' }: { heading?: 'h1' | 'h2' }) {
  return (
    <div className="flex flex-col gap-6 p-[clamp(22px,5vw,32px)] text-[17px] leading-[1.6]">
      <div className="eyebrow">{CARD.tagline}</div>

      <div className="flex items-center gap-3.5 text-ink">
        <LogoMark size={44} />
        <Heading className="m-0 inline-flex items-baseline font-brand text-[34px] font-extrabold leading-none tracking-[-.04em]">
          stash
          <span className="ml-[.24em] font-normal tracking-[-.02em]">labs</span>
          <span className="sr-only">contact card</span>
        </Heading>
      </div>

      <p className="m-0 max-w-[36ch] text-pretty text-base text-ink-2">
        {CARD.blurb}
      </p>

      <div className="flex flex-col border-b border-line text-[15px]">
        <div className={rowClass}>
          <span className="text-ink-2">Email</span>
          <a href={`mailto:${CARD.email}`} className={valueClass}>
            {CARD.email}
          </a>
        </div>
        {CARD.phone && (
          <div className={rowClass}>
            <span className="text-ink-2">Phone</span>
            <a href={`tel:${CARD.phone}`} className={valueClass}>
              {CARD.phone}
            </a>
          </div>
        )}
        <div className={rowClass}>
          <span className="text-ink-2">Web</span>
          <a href={CARD.url} className={valueClass}>
            {CARD.url.replace(/^https?:\/\/(www\.)?/, '')}
          </a>
        </div>
        <div className={rowClass}>
          <span className="text-ink-2">Based</span>
          <span className="font-mono text-[12.5px]">
            {CARD.locality}, {CARD.region}
          </span>
        </div>
        <div className={rowClass}>
          <span className="text-ink-2">Social</span>
          <span className="flex gap-4">
            {CARD.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={valueClass}
              >
                {s.label}
              </a>
            ))}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* A plain link, no download attribute: phones open the .vcf in Contacts. */}
        <a href={VCARD_PATH} className="btn-primary flex-1 justify-center whitespace-nowrap">
          Save contact{' '}
          <span aria-hidden="true" className="arrow">
            →
          </span>
        </a>
        <Link
          href="/#book"
          className="inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-sm border border-line-strong px-6 py-4 text-base font-semibold text-ink transition-colors hover:border-ink"
        >
          Book a chat
        </Link>
      </div>
    </div>
  );
}
