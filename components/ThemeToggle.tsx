'use client';

import { useEffect, useState } from 'react';

type Theme = 'paper' | 'ink';

/** One control. The label is the theme you would switch to. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('paper');

  useEffect(() => {
    if (document.documentElement.getAttribute('data-theme') === 'ink') {
      setTheme('ink');
    }
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'ink' ? 'paper' : 'ink';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    document.documentElement.classList.toggle('dark', next === 'ink');
    document.documentElement.classList.toggle('light', next === 'paper');
    try {
      localStorage.setItem('sl-theme', next);
    } catch {
      /* private mode — the choice still applies to this view */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="inline-flex cursor-pointer items-center gap-2 rounded-[2px] border border-line-strong bg-transparent px-2.5 py-[7px] font-mono text-xs uppercase tracking-[inherit] text-ink-2 transition-colors hover:border-ink hover:text-ink"
    >
      <span className="h-2 w-2 bg-accent" aria-hidden="true" />
      {theme === 'ink' ? 'Light' : 'Dark'}
    </button>
  );
}
