'use client';

import { useEffect, useState } from 'react';
import { ThinkingOrb } from 'thinking-orbs';

/**
 * First-visit entry screen. The boot script in layout.tsx decides whether this
 * runs (before paint, so returning visitors never see a flash); all this does
 * is hold the orb for a beat and get out of the way.
 */
export function Intro() {
  const [state, setState] = useState<'pending' | 'running' | 'done'>('pending');

  useEffect(() => {
    setState(
      document.documentElement.hasAttribute('data-intro') ? 'running' : 'done',
    );
  }, []);

  if (state === 'done') return null;

  return (
    <div
      className="sl-intro"
      aria-hidden="true"
      onAnimationEnd={() => {
        document.documentElement.removeAttribute('data-intro');
        setState('done');
      }}
    >
      {state === 'running' && <ThinkingOrb state="solving" size={64} />}
    </div>
  );
}
