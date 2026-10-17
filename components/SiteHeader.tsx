import { Wordmark } from '@/components/Wordmark';

export function SiteHeader({
  logoHref,
  links,
}: {
  logoHref: string;
  links: { href: string; label: string }[];
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="shell flex flex-wrap items-center gap-x-4 gap-y-2 py-4">
        <Wordmark href={logoHref} />
        <nav className="ml-auto flex items-center gap-7 font-mono text-xs uppercase tracking-[.06em]">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-navlink=""
              className="navlink text-ink-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book"
            className="book-btn shrink-0 whitespace-nowrap rounded-[2px] border border-ink px-3.5 py-[9px] text-ink transition-colors"
          >
            Book a check
          </a>
        </nav>
      </div>
    </header>
  );
}
