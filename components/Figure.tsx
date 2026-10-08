'use client';

import { useEffect, useRef } from 'react';
import {
  Branches,
  Exploded,
  Padlock,
  Riffle,
  Slow,
} from '@lucasmarkes/hairline/react';

const FIGURES = {
  branches: Branches,
  riffle: Riffle,
  exploded: Exploded,
  slow: Slow,
  padlock: Padlock,
};

type Props = {
  name: keyof typeof FIGURES;
  caption: string;
  /** Accessible name. Left out, the figure describes itself. */
  label?: string;
  /** The section background the figure sits on, so its plates match. */
  plate: 'bg' | 'surface';
  /** Sweep a phantom pointer over the figure until a real one arrives. */
  autoplay?: boolean;
  className?: string;
};

/** A hairline drawing with its mono "fig." caption underneath. */
export function Figure({
  name,
  caption,
  label,
  plate,
  autoplay = false,
  className = '',
}: Props) {
  const box = useRef<HTMLDivElement>(null);
  const Drawing = FIGURES[name];

  useEffect(() => {
    const el = box.current;
    if (!autoplay || !el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let paused = false;
    let resume: ReturnType<typeof setTimeout>;
    let raf = 0;
    const t0 = performance.now();

    // isTrusted keeps our own synthetic moves from pausing the loop.
    const onEnter = (e: PointerEvent) => {
      if (!e.isTrusted) return;
      paused = true;
      clearTimeout(resume);
    };
    const onLeave = (e: PointerEvent) => {
      if (!e.isTrusted) return;
      clearTimeout(resume);
      resume = setTimeout(() => (paused = false), 1200);
    };
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (paused) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight || !r.width) return;
      const t = (now - t0) / 1000;
      (el.querySelector('svg') ?? el).dispatchEvent(
        new PointerEvent('pointermove', {
          clientX: r.left + r.width * (0.5 + 0.34 * Math.sin(t * 0.55)),
          clientY: r.top + r.height * (0.5 + 0.26 * Math.sin(t * 0.83 + 1.1)),
          pointerType: 'mouse',
          bubbles: true,
        })
      );
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resume);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [autoplay]);

  return (
    <figure className={`m-0 flex flex-col gap-2.5 ${className}`}>
      <div ref={box}>
        <Drawing
          label={label}
          style={
            { '--hairline-plate': `var(--${plate})` } as React.CSSProperties
          }
        />
      </div>
      <figcaption className="border-t border-line pt-2.5 font-mono text-[11.5px] text-ink-3">
        {caption}
      </figcaption>
    </figure>
  );
}
