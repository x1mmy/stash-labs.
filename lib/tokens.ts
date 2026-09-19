import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export type TokenRow = { name: string; paper: string; ink: string };

/** Every `--name: value;` inside the first block matching `selector`. */
function decls(css: string, selector: string) {
  const body = css.split(selector)[1]?.split('}')[0] ?? '';
  return new Map(
    [...body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)].map((m) => [
      m[1],
      m[2].trim(),
    ])
  );
}

/**
 * The palette lives in globals.css and nowhere else. The design system page
 * parses it rather than restating it, so the guidelines cannot drift from the
 * styles the site actually ships.
 */
export function parseTokens(css: string): TokenRow[] {
  const paper = decls(css, '[data-theme="paper"]');
  const ink = decls(css, '[data-theme="ink"]');
  return [...paper].map(([name, value]) => ({
    name,
    paper: value,
    ink: ink.get(name) ?? value,
  }));
}

export function readTokens(): TokenRow[] {
  return parseTokens(
    readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8')
  );
}
