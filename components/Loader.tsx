'use client';

import { ThinkingOrb } from 'thinking-orbs';

/**
 * The one loading screen for the whole site and the ops portal. The orb reads
 * the live theme off the `light`/`dark` class the boot script puts on <html>.
 */
export function Loader({ label = 'Loading' }: { label?: string }) {
  return (
    <div
      className="flex min-h-[60dvh] w-full items-center justify-center"
      aria-busy="true"
      aria-live="polite"
    >
      <ThinkingOrb state="solving" size={64} aria-label={label} />
    </div>
  );
}
