/** The folded mark. Hover flips the middle slab and kicks the full stop. */
export function Mark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <polygon
        data-fold=""
        points="24,32 76,52 76,70 24,50"
        style={{ fill: 'var(--accent)' }}
      />
      <polygon points="88,8 24,32 24,50 88,26" fill="currentColor" />
      <polygon points="76,52 12,76 12,94 76,70" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({
  href,
  label = 'Stash Labs home',
}: {
  href: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      data-logo=""
      aria-label={label}
      className="flex items-center gap-2.5 text-ink"
    >
      <Mark />
      <span className="inline-flex items-baseline font-wordmark text-[21px] font-extrabold leading-none tracking-[-.04em]">
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
            data-stop=""
            points="0,0 13,5 13,14 0,9"
            style={{ fill: 'var(--accent)' }}
          />
        </svg>
      </span>
    </a>
  );
}
