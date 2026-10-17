import { Mark } from '@/components/Wordmark';

/** In-page hold for route transitions. The full-screen entry lives in Intro. */
export function Loader({ label = 'Loading' }: { label?: string }) {
  return (
    <div
      className="flex min-h-[60dvh] w-full items-center justify-center text-ink"
      aria-busy="true"
      aria-live="polite"
      aria-label={label}
    >
      <span className="inline-flex items-center gap-3">
        <Mark className="h-10 w-10" />
        <span className="font-wordmark text-[28px] font-extrabold tracking-[-.04em]">
          stash
          <span className="ml-[.24em] font-normal tracking-[-.02em]">labs</span>
        </span>
      </span>
    </div>
  );
}
