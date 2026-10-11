// Run with: npm test  (node --test, no framework)
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CARD, buildVCard } from './card.ts';

test('wraps the card in a CRLF-terminated vCard 3.0 envelope', () => {
  const lines = buildVCard().split('\r\n');
  assert.equal(lines[0], 'BEGIN:VCARD');
  assert.equal(lines[1], 'VERSION:3.0');
  assert.equal(lines.at(-2), 'END:VCARD');
  assert.equal(lines.at(-1), '');
  assert.ok(!buildVCard().replace(/\r\n/g, '').includes('\n'));
});

test('carries the name, email, site and socials', () => {
  const out = buildVCard();
  assert.ok(out.includes('FN:Stash Labs\r\n'));
  assert.ok(out.includes(`EMAIL;TYPE=INTERNET,WORK:${CARD.email}\r\n`));
  assert.ok(out.includes(`URL:${CARD.url}\r\n`));
  for (const s of CARD.socials) assert.ok(out.includes(s.url));
});

test('leaves the phone line out until a number is set', () => {
  assert.ok(!buildVCard({ ...CARD, phone: '' }).includes('TEL'));
  assert.ok(
    buildVCard({ ...CARD, phone: '+61400000000' }).includes(
      'TEL;TYPE=WORK,VOICE:+61400000000\r\n'
    )
  );
});

test('escapes vCard syntax characters in text values', () => {
  const out = buildVCard({ ...CARD, name: 'Stash; Labs, Pty\\Ltd' });
  assert.ok(out.includes('FN:Stash\\; Labs\\, Pty\\\\Ltd\r\n'));
});
