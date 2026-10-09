// Run with: npm test  (node --test, no framework)
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { qrSvg } from './qr.ts';

test('draws a square SVG with a quiet zone around the modules', () => {
  const svg = qrSvg('https://www.stashlabs.com.au/card');
  const size = Number(svg.match(/viewBox="0 0 (\d+) \1"/)?.[1]);
  // The smallest QR is 21 modules, plus 4 of quiet zone each side.
  assert.ok(size >= 29, `unexpected size: ${size}`);
  // Nothing is drawn inside the quiet zone.
  for (const [, x, y] of svg.matchAll(/M(\d+) (\d+)h1/g)) {
    assert.ok(+x >= 4 && +x < size - 4 && +y >= 4 && +y < size - 4);
  }
});

test('different text gives a different code', () => {
  assert.notEqual(qrSvg('https://a.example'), qrSvg('https://b.example'));
});
