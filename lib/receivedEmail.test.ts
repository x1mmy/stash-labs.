import assert from 'node:assert/strict';
import { test } from 'node:test';
import { receivedEmail } from './receivedEmail.ts';

test('personalises the headline with the first name', () => {
  const html = receivedEmail('Jordan Ellis');
  assert.match(html, /Thanks, Jordan\. It landed/);
  assert.doesNotMatch(html, /Book a 20 minute call/);
  assert.doesNotMatch(html, /would rather not wait/);
});

test('falls back when the name is empty after split edge cases', () => {
  const html = receivedEmail('');
  assert.match(html, /Thanks\. It landed/);
});

test('escapes HTML in the name', () => {
  const html = receivedEmail('<script>alert(1)</script> Jordan');
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
});

test('points the logo at the live absolute URL', () => {
  const html = receivedEmail('Jordan');
  assert.match(
    html,
    /src="https:\/\/www\.stashlabs\.com\.au\/apple-touch-icon\.png"/
  );
});
