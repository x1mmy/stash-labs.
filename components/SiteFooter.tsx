import { ThemeToggle } from '@/components/ThemeToggle';

const linkClass = 'link-rule text-ink-3 hover:text-ink';

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-wrap items-center justify-between gap-4 py-7 font-mono text-xs text-ink-3">
        <div className="flex flex-wrap gap-x-3.5 gap-y-1.5">
          <span>© {new Date().getFullYear()} Stash Labs</span>
          <span>·</span>
          <span>Sydney</span>
          <span>·</span>
          <span>ABN 84 646 997 633</span>
          <span>·</span>
          <a href="mailto:team@stashlabs.com.au" className={linkClass}>
            team@stashlabs.com.au
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="https://www.timetally.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            TimeTally
          </a>
          <a
            href="https://www.linkedin.com/company/stash-labs/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/stash.labs/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Instagram
          </a>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
