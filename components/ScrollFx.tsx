'use client';

import { useEffect, useRef } from 'react';

/**
 * One mount drives all three scroll behaviours from the design so the section
 * components can stay static server components:
 *   - the 2px accent progress bar
 *   - reveal-on-scroll for [data-reveal]
 *   - count-up for [data-count]
 *   - grid parallax on [data-hero-art]
 */
export function ScrollFx() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]')
    );
    let revealObserver: IntersectionObserver | undefined;

    if (!reduced) {
      reveals.forEach((el, i) => {
        el.classList.add('armed');
        el.style.transitionDelay = `${(i % 4) * 70}ms`;
      });
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              revealObserver!.unobserve(e.target);
            }
          });
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.06 }
      );
      reveals.forEach((el) => revealObserver!.observe(el));
    }

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          countObserver.unobserve(e.target);
          const el = e.target as HTMLElement;
          const target = parseFloat(el.dataset.count || '0');
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / 1400);
            el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          // Zero it only here, one frame before the tween starts. Doing it at
          // mount would strand the stat on "0" for anyone whose observer or
          // rAF never runs.
          el.textContent = '0';
          requestAnimationFrame(tick);
        });
      },
      // Low threshold: a stat sitting near a viewport edge should still land on
      // its real value rather than being stranded at the start of the tween.
      { threshold: 0.2 }
    );

    // The markup renders the FINAL number, so no-JS and reduced-motion already
    // read correctly and need no observer at all.
    if (!reduced) {
      document
        .querySelectorAll<HTMLElement>('[data-count]')
        .forEach((el) => countObserver.observe(el));
    }

    const heroArt = document.querySelector<HTMLElement>('[data-hero-art]');
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) {
        progressRef.current.style.width = `${(p * 100).toFixed(2)}%`;
      }
      if (heroArt && !reduced) {
        const r = heroArt.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          heroArt.style.backgroundPosition = `0 ${(r.top * -0.06).toFixed(1)}px`;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      revealObserver?.disconnect();
      countObserver.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div ref={progressRef} className="h-full w-0 origin-left bg-accent" />
    </div>
  );
}
