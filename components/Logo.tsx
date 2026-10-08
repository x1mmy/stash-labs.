/** The three-fold mark. The middle fold is the one accent plate. */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <polygon
        className="logo-fold"
        points="24,32 76,52 76,70 24,50"
        fill="var(--accent)"
      />
      <polygon points="88,8 24,32 24,50 88,26" fill="currentColor" />
      <polygon points="76,52 12,76 12,94 76,70" fill="currentColor" />
    </svg>
  );
}

/** Mark + "stash labs" wordmark, linking home. Hover flips the fold. */
export function Logo({ href = '#top' }: { href?: string }) {
  return (
    <a
      href={href}
      aria-label="Stash Labs home"
      className="logo flex items-center gap-2.5 text-ink"
    >
      <LogoMark />
      <span className="inline-flex items-baseline font-brand text-[21px] font-extrabold leading-none tracking-[-.04em]">
        stash
        <span className="ml-[.24em] font-normal tracking-[-.02em]">labs</span>
        <svg
          width="5"
          height="6"
          viewBox="0 0 13 14"
          className="ml-0.5 overflow-visible"
          aria-hidden="true"
        >
          <polygon
            className="logo-stop"
            points="0,0 13,5 13,14 0,9"
            fill="var(--accent)"
          />
        </svg>
      </span>
    </a>
  );
}
