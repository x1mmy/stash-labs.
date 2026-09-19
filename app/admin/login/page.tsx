import type { Metadata } from 'next';
import { LoginForm } from '@/components/admin/LoginForm';

export const metadata: Metadata = {
  title: 'Sign in · Stash Labs Ops',
  robots: { index: false, follow: false },
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  return (
    <div className="flex min-h-[calc(100dvh-96px)] items-center justify-center">
      <div className="w-full max-w-[380px] rounded-[4px] border border-line bg-surface p-7 min-[681px]:p-8">
        <div className="mb-7">
          <div className="mb-2 font-mono text-[10.5px] uppercase tracking-[.14em] text-ink-3">
            <span className="text-accent">SL</span> Ops
          </div>
          <h1 className="m-0 text-[clamp(26px,4vw,34px)] font-semibold leading-[1.05] tracking-[-.03em]">
            Sign in
          </h1>
          <p className="m-0 mt-2 text-[13.5px] leading-[1.6] text-ink-3">
            Internal dashboard. One shared login.
          </p>
        </div>
        <LoginForm next={searchParams.next} />
      </div>
    </div>
  );
}
