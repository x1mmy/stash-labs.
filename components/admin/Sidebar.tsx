'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { logout } from '@/app/admin/actions';

const NAV = [
  { href: '/admin', label: 'Overview', num: '01' },
  { href: '/admin/clients', label: 'Clients', num: '02' },
  { href: '/admin/subscriptions', label: 'Subscriptions', num: '03' },
  { href: '/admin/ledger', label: 'Ledger', num: '04' },
];

/**
 * Mobile: sticky top bar + burger that opens a left drawer.
 * Desktop (≥901px): full-height rail. One nav tree for both.
 */
export function Sidebar() {
  const pathname = usePathname();
  const panelId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Drawer state is mobile-only; drop it if the rail takes over.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)');
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // The login page shares this layout but has no session to navigate with.
  if (pathname === '/admin/login') return null;

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-surface px-4 py-3 min-[681px]:px-5 min-[901px]:hidden">
        <Link
          href="/admin"
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.14em] no-underline"
        >
          <span className="text-accent">SL</span>
          <span className="text-ink-2">Ops</span>
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[3px] border border-line text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
        >
          <span className="relative block h-3 w-3.5" aria-hidden>
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${
                open ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${
                open ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </div>

      <div
        aria-hidden
        className={`fixed inset-0 z-20 bg-ink/20 transition-opacity duration-300 ease-[cubic-bezier(.16,1,.3,1)] min-[901px]:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
      />

      <nav
        id={panelId}
        aria-label="Ops sections"
        className={`fixed inset-y-0 left-0 z-30 flex w-[min(280px,86vw)] flex-col border-r border-line bg-surface px-4 py-6 transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] min-[901px]:sticky min-[901px]:top-0 min-[901px]:z-10 min-[901px]:h-dvh min-[901px]:w-[224px] min-[901px]:shrink-0 min-[901px]:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full min-[901px]:translate-x-0'
        }`}
      >
        <Link
          href="/admin"
          className="mb-7 hidden items-center gap-2 px-3 font-mono text-[11px] uppercase tracking-[.14em] no-underline min-[901px]:flex"
        >
          <span className="text-accent">SL</span>
          <span className="text-ink-2">Ops</span>
        </Link>

        <div className="flex flex-col gap-1">
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
                className={`relative flex items-center gap-2.5 rounded-[3px] px-3 py-2.5 font-mono text-[11.5px] uppercase tracking-[.1em] no-underline transition-colors ${
                  active
                    ? 'bg-surface-2 text-ink'
                    : 'text-ink-3 hover:bg-surface-2/60 hover:text-ink-2'
                }`}
              >
                {active && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-1/2 h-[14px] w-[2px] -translate-y-1/2 bg-accent"
                  />
                )}
                <span className={active ? 'text-accent' : 'text-ink-3/70'}>
                  {item.num}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>

        <form
          action={logout}
          className="mt-auto w-full border-t border-line pt-4"
        >
          <button
            type="submit"
            className="w-full cursor-pointer rounded-[3px] border border-line px-3 py-2 text-left font-mono text-[10.5px] uppercase tracking-[.12em] text-ink-3 transition-colors hover:border-line-strong hover:text-ink"
          >
            Sign out
          </button>
        </form>
      </nav>
    </>
  );
}
