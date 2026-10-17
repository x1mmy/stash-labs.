import type { Metadata } from 'next';
import { FigureFrame } from '@/components/HairlineFigure';
import { Wordmark } from '@/components/Wordmark';

export const metadata: Metadata = {
  title: 'Page not found | Stash Labs',
  description: 'This address does not match a page on Stash Labs.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="border-b border-line">
        <div className="shell flex items-center py-4">
          <Wordmark href="/" />
        </div>
      </header>

      <main className="flex flex-1 items-center">
        <div className="shell grid w-full grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-center gap-[clamp(32px,5vw,80px)] py-[clamp(56px,8vw,112px)] max-[760px]:grid-cols-1">
          <div className="flex flex-col gap-7">
            <div className="font-mono text-xs uppercase tracking-[.08em] text-accent">
              404
            </div>
            <h1 className="m-0 max-w-[12ch] text-balance font-display text-[clamp(40px,6vw,84px)] font-medium leading-none tracking-[-.035em]">
              This page isn&apos;t here
              <span className="text-accent">.</span>
            </h1>
            <p className="m-0 max-w-[42ch] text-pretty text-[clamp(17px,1.5vw,20px)] text-ink-2">
              That address doesn&apos;t match anything we publish. The work is still on the home page.
            </p>
            <a
              href="/"
              className="cta inline-flex w-fit items-center gap-3 rounded-[2px] bg-accent px-6 py-4 text-base font-semibold text-accent-ink"
            >
              Back to home <span aria-hidden="true">→</span>
            </a>
          </div>
          <FigureFrame
            name="loupe"
            autoplay
            label="A loupe over a blank sheet: nothing is written here"
            caption="fig. 01 — A closer look, and the page is blank."
          />
        </div>
      </main>
    </div>
  );
}
