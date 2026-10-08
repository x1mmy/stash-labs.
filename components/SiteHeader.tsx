import { Logo } from '@/components/Logo';

const NAV = [
  { href: '#how', label: 'How we work' },
  { href: '#products', label: 'Products' },
  { href: '#faq', label: 'FAQ' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="shell flex items-center justify-between gap-4 py-4">
        <Logo />

        <nav className="flex items-center gap-7 font-mono text-xs uppercase tracking-[.06em]">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-rule text-ink-2 hover:text-ink max-[760px]:hidden"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#book"
            className="rounded-sm border border-ink px-3.5 py-[9px] text-ink transition-colors duration-200 hover:bg-ink hover:text-bg"
          >
            Book a chat
          </a>
        </nav>
      </div>
    </header>
  );
}
