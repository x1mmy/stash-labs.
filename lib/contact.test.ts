// Run with: npm test  (node --test, no framework)
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseContact } from './contact.ts';

const valid = {
  name: '  Jordan Ellis ',
  email: 'jordan@business.com.au',
  message: 'Payroll eats my Sundays.',
  business: 'Ellis Plumbing',
  topic: 'A website',
};

test('accepts and trims a valid submission', () => {
  const out = parseContact(valid);
  assert.deepEqual(out, {
    name: 'Jordan Ellis',
    email: 'jordan@business.com.au',
    message: 'Payroll eats my Sundays.',
    business: 'Ellis Plumbing',
    topic: 'A website',
  });
});

test('a filled honeypot is flagged as spam', () => {
  assert.deepEqual(parseContact({ ...valid, company: 'Acme' }), {
    error: 'spam',
  });
});

test('an empty honeypot passes through', () => {
  assert.ok(!('error' in parseContact({ ...valid, company: '   ' })));
});

test('rejects a missing name, bad email, and empty message', () => {
  assert.equal(
    (parseContact({ ...valid, name: '   ' }) as { error: string }).error,
    'Please add your name.'
  );
  for (const email of ['nope', 'a@b', 'a b@c.com', '']) {
    assert.ok(
      'error' in parseContact({ ...valid, email }),
      `should reject email: ${JSON.stringify(email)}`
    );
  }
  assert.ok('error' in parseContact({ ...valid, message: '  ' }));
});

test('caps long fields instead of trusting them', () => {
  const out = parseContact({ ...valid, message: 'x'.repeat(9000) });
  assert.equal((out as { message: string }).message.length, 4000);
});

test('non-string and non-object input never throws', () => {
  assert.ok('error' in parseContact(null));
  assert.ok('error' in parseContact('a string'));
  assert.ok('error' in parseContact([valid]));
  // Wrong types for optional fields degrade to empty, not a crash.
  const out = parseContact({ ...valid, business: 42, topic: null });
  assert.deepEqual(
    { business: (out as { business: string }).business, topic: (out as { topic: string }).topic },
    { business: '', topic: 'Not sure yet' }
  );
});
