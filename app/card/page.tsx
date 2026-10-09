import type { Metadata } from 'next';
import { ContactCard } from '@/components/ContactCard';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CARD, CARD_PATH } from '@/lib/card';

const title = 'Stash Labs | Contact card';
const description = `Save Stash Labs to your contacts. ${CARD.blurb}`;

export const metadata: Metadata = {
  title: 'Contact card | Stash Labs',
  description,
  alternates: { canonical: CARD_PATH },
  // Spelled out in full because a page's openGraph replaces the layout's, it
  // does not merge. This is the preview a shared link shows in Messages.
  openGraph: {
    title,
    description,
    url: CARD_PATH,
    siteName: 'Stash Labs',
    locale: 'en_AU',
    type: 'website',
    images: [
      { url: '/android-chrome-512x512.png', width: 512, height: 512, alt: 'Stash Labs' },
    ],
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: ['/android-chrome-512x512.png'],
  },
};

/** The standalone card. This is the page an NFC tap or a shared link lands on. */
export default function CardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-line">
        <div className="shell flex items-center justify-between gap-4 py-4">
          <Logo href="/" />
          <span className="font-mono text-[11.5px] uppercase tracking-[.09em] text-ink-2">
            Sydney, AU
          </span>
        </div>
      </header>

      <main className="shell flex flex-1 items-center justify-center py-[clamp(24px,6vw,72px)]">
        <div className="w-full max-w-[440px] rounded-sm border border-line-strong bg-surface [animation:riseIn_.8s_cubic-bezier(.16,1,.3,1)_both]">
          <ContactCard heading="h1" />
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-7 font-mono text-xs text-ink-3">
          <span>© {new Date().getFullYear()} Stash Labs · Sydney, Australia</span>
          <ThemeToggle />
        </div>
      </footer>
    </div>
  );
}
