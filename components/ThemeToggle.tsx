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

  const set = (next: Theme) => {
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

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className="flex items-center gap-1 rounded-full border border-line-strong p-1"
    >
      {(['paper', 'ink'] as const).map((option) => {
        const active = theme === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => set(option)}
            aria-pressed={active}
            className={`cursor-pointer rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[.1em] transition-colors ${
              active
                ? 'bg-accent text-accent-ink'
                : 'bg-transparent text-ink-3 hover:text-ink'
            }`}
          >
            {option === 'paper' ? 'Light' : 'Dark'}
          </button>
        );
      })}
    </div>
  );
}
