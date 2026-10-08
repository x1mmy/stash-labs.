'use client';

import { useEffect, useState } from 'react';

type Theme = 'paper' | 'ink';

/** Sits inline in the footer. Light is the default; only an explicit choice persists. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('paper');

  // The inline boot script in layout.tsx already set the attribute; read it back.
  useEffect(() => {
    if (document.documentElement.getAttribute('data-theme') === 'ink') {
      setTheme('ink');
    }
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'ink' ? 'paper' : 'ink';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    // thinking-orbs reads the theme off this class, not our paper/ink names.
    document.documentElement.classList.toggle('dark', next === 'ink');
    document.documentElement.classList.toggle('light', next === 'paper');
    try {
      localStorage.setItem('sl-theme', next);
    } catch {
      /* private mode - the choice still applies to this page view */
    }
  };

  // The label names the theme you would switch to, not the one you are in.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="flex cursor-pointer items-center gap-2 rounded-sm border border-line-strong bg-transparent px-2.5 py-[7px] font-mono text-xs text-ink-2 transition-colors duration-200 hover:border-ink hover:text-ink"
    >
      <span className="h-2 w-2 bg-accent" />
      {theme === 'ink' ? 'Light' : 'Dark'}
    </button>
  );
}
