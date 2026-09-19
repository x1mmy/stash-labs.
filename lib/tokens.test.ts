// Run with: npm test  (node --test, no framework)
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseTokens, readTokens } from './tokens.ts';

test('pairs each paper token with its ink counterpart', () => {
  const css = `
:root,
[data-theme="paper"] {
  --bg: #f2eee7;
  --line: rgba(22, 19, 15, 0.14);
  --only-in-paper: #fff;
}
[data-theme="ink"] {
  --bg: #0c0b0a;
  --line: rgba(244, 241, 235, 0.12);
}
`;
  assert.deepEqual(parseTokens(css), [
    { name: 'bg', paper: '#f2eee7', ink: '#0c0b0a' },
    { name: 'line', paper: 'rgba(22, 19, 15, 0.14)', ink: 'rgba(244, 241, 235, 0.12)' },
    // No ink override means the paper value carries through.
    { name: 'only-in-paper', paper: '#fff', ink: '#fff' },
  ]);
});

test('the real globals.css parses and both themes define every token', () => {
  const rows = readTokens();
  assert.ok(rows.length >= 10, `expected the full palette, got ${rows.length}`);
  assert.ok(rows.every((r) => r.paper && r.ink));
  assert.equal(rows.find((r) => r.name === 'accent')?.paper, '#e5522a');
});
