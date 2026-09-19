'use client';

import { useState } from 'react';
import { ThinkingOrb } from 'thinking-orbs';

/** Full-screen entry overlay on every load. Unmounts when the hold-then-fade ends. */
export function Intro() {
  const [done, setDone] = useState(false);
  if (done) return null;

  return (
    <div
      className="sl-intro"
      aria-hidden="true"
      onAnimationEnd={() => setDone(true)}
    >
      <ThinkingOrb state="solving" size={64} />
    </div>
  );
}
