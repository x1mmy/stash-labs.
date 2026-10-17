'use client';

import { useEffect, useRef } from 'react';

type Handle = { destroy: () => void };
type Figure = {
  range: number[];
  mount: (
    parts: { stage: HTMLElement; svg: SVGSVGElement; read: { textContent: string } },
    value: number
  ) => Handle;
};

function runScript(source: string) {
  const script = document.createElement('script');
  script.text = source;
  document.head.appendChild(script);
}

/** The folder figure drawn for this page. The tab under the pointer lifts. */
export function FileFigure({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let dead = false;
    let handle: Handle | null = null;
    const win = window as Window & {
      HL?: { inject: (root: ParentNode) => void; mk: (tag: string, attrs: Record<string, string>, parent: HTMLElement) => SVGSVGElement };
      hairline?: (figure: Figure) => void;
      __hlFile?: Figure;
    };

    const mount = async () => {
      if (!win.HL) {
        const kernel = await fetch('/vendor/hairline-kernel.js').then((res) => res.text());
        if (dead) return;
        if (!win.HL) runScript(kernel);
      }
      if (!win.__hlFile) {
        win.hairline = (figure) => {
          win.__hlFile = figure;
        };
        const figureSrc = await fetch('/vendor/file.js').then((res) => res.text());
        if (dead) return;
        if (!win.__hlFile) runScript(figureSrc);
      }
      const figure = win.__hlFile;
      if (dead || !el || !win.HL || !figure) return;
      win.HL.inject(document);
      el.replaceChildren();
      el.setAttribute('data-hairline', 'file');
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', label);
      const svg = win.HL.mk('svg', { viewBox: '0 0 400 320', 'aria-hidden': 'true' }, el);
      handle = figure.mount({ stage: el, svg, read: { textContent: '' } }, figure.range[1]);
    };

    mount();
    return () => {
      dead = true;
      handle?.destroy();
    };
  }, [label]);

  return <div ref={ref} className="aspect-[5/4] w-full" />;
}
