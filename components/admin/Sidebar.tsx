'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/admin/actions';

const NAV = [
  { href: '/admin', label: 'Overview', num: '01' },
  { href: '/admin/clients', label: 'Clients', num: '02' },
  { href: '/admin/subscriptions', label: 'Subscriptions', num: '03' },
  { href: '/admin/ledger', label: 'Ledger', num: '04' },
];

/**
 * One markup tree for both shapes. Below 901px it wraps into a two-row top bar
 * (wordmark and sign out, then the scrolling section pills); above it becomes
 * the full-height rail. Flex order keeps sign out last on the rail and beside
 * the wordmark on a phone, without a second copy of the form.
 */
export function Sidebar() {
  const pathname = usePathname();

  // The login page shares this layout but has no session to navigate with.
  if (pathname === '/admin/login') return null;

  return (
    <nav
      aria-label="Ops sections"
      className="z-10 flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-line bg-surface px-4 py-3 min-[681px]:px-5 min-[901px]:sticky min-[901px]:top-0 min-[901px]:h-dvh min-[901px]:w-[224px] min-[901px]:shrink-0 min-[901px]:flex-col min-[901px]:flex-nowrap min-[901px]:items-stretch min-[901px]:gap-0 min-[901px]:border-b-0 min-[901px]:border-r min-[901px]:px-4 min-[901px]:py-6"
    >
      <Link
        href="/admin"
        className="flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[.14em] no-underline min-[901px]:mb-7 min-[901px]:px-3"
      >
        <span className="text-accent">SL</span>
        <span className="text-ink-2">Ops</span>
      </Link>

      <div className="order-3 flex w-full min-w-0 gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[901px]:order-2 min-[901px]:flex-col min-[901px]:overflow-visible">
        {NAV.map((item) => {
          const active =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`relative flex shrink-0 items-center gap-2 rounded-[3px] px-3 py-2 font-mono text-[11px] uppercase tracking-[.1em] no-underline transition-colors min-[901px]:gap-2.5 min-[901px]:text-[11.5px] ${
                active
                  ? 'bg-surface-2 text-ink'
                  : 'text-ink-3 hover:bg-surface-2/60 hover:text-ink-2'
              }`}
            >
              {/* The accent marks position, once per screen. */}
              {active && (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-[14px] w-[2px] -translate-y-1/2 bg-accent max-[900px]:hidden"
                />
              )}
              <span
                className={`max-[900px]:hidden ${active ? 'text-accent' : 'text-ink-3/70'}`}
              >
                {item.num}
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>

      <form
        action={logout}
        className="order-2 ml-auto shrink-0 min-[901px]:order-3 min-[901px]:ml-0 min-[901px]:mt-auto min-[901px]:w-full min-[901px]:border-t min-[901px]:border-line min-[901px]:pt-4"
      >
        <button
          type="submit"
          className="w-full cursor-pointer rounded-[3px] border border-line px-3 py-1.5 text-center font-mono text-[10px] uppercase tracking-[.12em] text-ink-3 transition-colors hover:border-line-strong hover:text-ink min-[901px]:px-3 min-[901px]:py-2 min-[901px]:text-left min-[901px]:text-[10.5px]"
        >
          Sign out
        </button>
      </form>
    </nav>
  );
}
