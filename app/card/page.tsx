import type { Metadata } from 'next';
import { ContactCard } from '@/components/ContactCard';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CARD, CARD_PATH } from '@/lib/card';

export const metadata: Metadata = {
  title: 'Contact card | Stash Labs',
  description: `Save Stash Labs to your contacts. ${CARD.blurb}`,
  alternates: { canonical: CARD_PATH },
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
