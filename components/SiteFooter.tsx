import Image from 'next/image';
import { ThemeToggle } from '@/components/ThemeToggle';

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell pb-[clamp(28px,3vw,40px)] pt-[clamp(48px,6vw,80px)]">
        <div className="mb-[clamp(40px,5vw,72px)] grid gap-[clamp(28px,4vw,56px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
          <div className="col-span-2 min-w-0 max-[680px]:col-auto">
            <div className="mb-3.5 flex items-center gap-3.5 text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.03em]">
              <Image
                src="/android-chrome-512x512.png"
                alt=""
                width={46}
                height={46}
                className="block h-[clamp(34px,4.4vw,48px)] w-[clamp(34px,4.4vw,48px)] rounded-[11px]"
              />
              <span>
                Stash Labs<span className="text-accent">.</span>
              </span>
            </div>
            <p className="m-0 max-w-[34ch] text-base leading-[1.6] text-ink-2">
              Building the tech we wished existed, for Australian small
              businesses.
            </p>
          </div>

          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[.1em] text-ink-3">
              Work
            </div>
            <div className="flex flex-col gap-2.5 text-[15px]">
              <a
                href="https://www.timetally.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink transition-colors hover:text-tt"
              >
                TimeTally
              </a>
              <a
                href="https://www.prestigeeventcollective.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink transition-colors hover:text-accent"
              >
                Client sites
              </a>
              <a
                href="#work"
                className="text-ink transition-colors hover:text-accent"
              >
                In build
              </a>
            </div>
          </div>

          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[.1em] text-ink-3">
              Elsewhere
            </div>
            <div className="flex flex-col gap-2.5 text-[15px]">
              <a
                href="mailto:team@stashlabs.com.au"
                className="text-ink transition-colors hover:text-accent"
              >
                team@stashlabs.com.au
              </a>
              <a
                href="https://www.linkedin.com/company/stash-labs/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink transition-colors hover:text-accent"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/stash.labs/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink transition-colors hover:text-accent"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[11.5px] text-ink-3">
          <span>© {new Date().getFullYear()} Stash Labs · Sydney, Australia</span>
          <div className="flex flex-wrap items-center gap-[22px]">
            <a
              href="/design-system"
              className="text-ink-3 transition-colors hover:text-ink"
            >
              Design system
            </a>
            <a href="#privacy" className="text-ink-3 transition-colors hover:text-ink">
              Privacy
            </a>
            <a href="#terms" className="text-ink-3 transition-colors hover:text-ink">
              Terms
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
