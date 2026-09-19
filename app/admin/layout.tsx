import type { Metadata } from 'next';
import { Sidebar } from '@/components/admin/Sidebar';

export const metadata: Metadata = {
  title: 'Stash Labs Ops',
  robots: { index: false, follow: false },
};

// The root layout already sets data-theme before paint and renders the global
// theme toggle, so these screens inherit both with no code of their own.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg min-[901px]:flex-row">
      <Sidebar />
      <main className="min-w-0 flex-1 px-5 py-6 min-[681px]:px-8 min-[681px]:py-9">
        {/* Capped so tables stay readable on a wide monitor instead of
            stretching a six-column ledger across 2000px. */}
        <div className="mx-auto w-full max-w-[1180px]">{children}</div>
      </main>
    </div>
  );
}
