'use client';

import { useEffect, useRef } from 'react';
import type { Figure, HairlineOptions } from '@lucasmarkes/hairline';

type FigureName =
  | 'branches'
  | 'riffle'
  | 'exploded'
  | 'slow'
  | 'padlock'
  | 'query'
  | 'loupe';

function themeOf() {
  return document.documentElement.getAttribute('data-theme') === 'ink'
    ? 'dark'
    : 'light';
}

/** Sweeps a fake pointer so the hero figure moves before anyone touches it. */
function startGhost(el: HTMLElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }
  let paused = false;
  let resumeT = 0;
  let raf = 0;
  const t0 = performance.now();
  const onEnter = (event: PointerEvent) => {
    if (event.isTrusted) {
      paused = true;
      window.clearTimeout(resumeT);
    }
  };
  const onLeave = (event: PointerEvent) => {
    if (event.isTrusted) {
      window.clearTimeout(resumeT);
      resumeT = window.setTimeout(() => {
        paused = false;
      }, 1200);
    }
  };
  el.addEventListener('pointerenter', onEnter);
  el.addEventListener('pointerleave', onLeave);
  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    if (paused) return;
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight || !r.width) return;
    const t = (now - t0) / 1000;
    const x = r.left + r.width * (0.5 + 0.34 * Math.sin(t * 0.55));
    const y = r.top + r.height * (0.5 + 0.26 * Math.sin(t * 0.83 + 1.1));
    const target = el.querySelector('svg') || el;
    target.dispatchEvent(
      new PointerEvent('pointermove', {
        clientX: x,
        clientY: y,
        pointerType: 'mouse',
        bubbles: true,
      })
    );
  };
  raf = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(raf);
    window.clearTimeout(resumeT);
    el.removeEventListener('pointerenter', onEnter);
    el.removeEventListener('pointerleave', onLeave);
  };
}

export function HairlineFigure({
  name,
  label,
  intensity = 0.5,
  autoplay = false,
}: {
  name: FigureName;
  label: string;
  intensity?: number;
  autoplay?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let figure: Figure | null = null;
    let stopGhost: (() => void) | undefined;

    const mount = async () => {
      stopGhost?.();
      stopGhost = undefined;
      figure?.destroy();
      figure = null;
      const mod = await import('@lucasmarkes/hairline');
      if (cancelled || !ref.current) return;
      const draw = mod[name] as (
        host: HTMLElement,
        options?: HairlineOptions
      ) => Figure;
      ref.current.innerHTML = '';
      ref.current.setAttribute('role', 'img');
      ref.current.setAttribute('aria-label', label);
      figure = draw(ref.current, {
        intensity,
        theme: themeOf(),
        label,
      });
      if (autoplay) stopGhost = startGhost(ref.current);
    };

    mount();
    const obs = new MutationObserver(() => {
      figure?.update({ theme: themeOf() });
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      cancelled = true;
      obs.disconnect();
      stopGhost?.();
      figure?.destroy();
    };
  }, [name, label, intensity, autoplay]);

  return <div ref={ref} className="aspect-[5/4] w-full" />;
}

export function FigureFrame({
  name,
  label,
  caption,
  intensity,
  autoplay,
}: {
  name: FigureName;
  label: string;
  caption: string;
  intensity?: number;
  autoplay?: boolean;
}) {
  return (
    <figure className="m-0 flex flex-col gap-2.5">
      <HairlineFigure
        name={name}
        label={label}
        intensity={intensity}
        autoplay={autoplay}
      />
      <figcaption className="border-t border-line pt-2.5 font-mono text-[11.5px] text-ink-3">
        {caption}
      </figcaption>
    </figure>
  );
}
