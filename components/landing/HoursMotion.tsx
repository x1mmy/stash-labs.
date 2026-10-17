'use client';

import { useEffect } from 'react';

/** Plays the Hours Check entrance once the wordmark loader has left. */
export function HoursMotion() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    root.classList.add('hc-motion');
    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      root.classList.add('hc-play');
    };

    const intro = document.querySelector('.sl-intro');
    const onEnd = (event: Event) => {
      if (event instanceof AnimationEvent && event.animationName !== 'ldOut') return;
      play();
    };
    intro?.addEventListener('animationend', onEnd);
    const fallback = window.setTimeout(play, intro ? 3200 : 40);

    const seen = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('hc-in');
          seen.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    document.querySelectorAll('[data-hc]').forEach((el) => seen.observe(el));

    return () => {
      intro?.removeEventListener('animationend', onEnd);
      window.clearTimeout(fallback);
      seen.disconnect();
      root.classList.remove('hc-motion', 'hc-play');
    };
  }, []);

  return null;
}
