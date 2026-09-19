// Run with: npm test  (node --test, no framework)
//
// Covers the two places a silent bug is expensive: the crypto that decides who
// gets in, and the arithmetic that turns Stripe prices into money on screen.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  SESSION_TTL_MS,
  createSessionToken,
  sessionSecret,
  timingSafeEqual,
  verifySessionToken,
} from './auth.ts';
import { clientStatus, monthlyCents, sumByCurrency } from './format.ts';

const SECRET = 'test-secret-not-the-real-one';

// The login compares ADMIN_EMAIL and ADMIN_PASSWORD as plain strings, so this
// comparison is the whole credential check.
test('timingSafeEqual matches only identical strings', () => {
  assert.equal(timingSafeEqual('admin123', 'admin123'), true);
  assert.equal(timingSafeEqual('admin123', 'Admin123'), false, 'case matters');
  assert.equal(timingSafeEqual('admin123', 'admin1234'), false, 'length mismatch');
  assert.equal(timingSafeEqual('admin123', 'admin12'), false);
  assert.equal(timingSafeEqual('', 'admin123'), false);
  assert.equal(timingSafeEqual('', ''), true);
});

test('the cookie signing key prefers the explicit secret', () => {
  const saved = { ...process.env };
  try {
    delete process.env.ADMIN_SESSION_SECRET;
    process.env.ADMIN_EMAIL = 'admin@example.com';
    process.env.ADMIN_PASSWORD = 'admin123';
    assert.equal(sessionSecret(), 'admin@example.com:admin123', 'derived fallback');

    process.env.ADMIN_SESSION_SECRET = 'an explicit secret';
    assert.equal(sessionSecret(), 'an explicit secret');

    // Otherwise an unconfigured deployment would sign and verify cookies with
    // a key of "undefined:undefined", letting anyone mint one.
    delete process.env.ADMIN_SESSION_SECRET;
    delete process.env.ADMIN_PASSWORD;
    assert.equal(sessionSecret(), undefined, 'nothing configured, no key');
  } finally {
    process.env = saved;
  }
});

test('a fresh session token verifies against its own secret only', async () => {
  const token = await createSessionToken(SECRET);

  assert.equal(await verifySessionToken(token, SECRET), true);
  assert.equal(await verifySessionToken(token, 'a different secret'), false);
  assert.equal(await verifySessionToken(token, undefined), false);
  assert.equal(await verifySessionToken(undefined, SECRET), false);
});

test('an expired session token is rejected', async () => {
  const now = Date.now();
  const token = await createSessionToken(SECRET, now);

  assert.equal(await verifySessionToken(token, SECRET, now + SESSION_TTL_MS - 1000), true);
  assert.equal(await verifySessionToken(token, SECRET, now + SESSION_TTL_MS + 1000), false);
});

test('moving the expiry invalidates the signature', async () => {
  const token = await createSessionToken(SECRET);
  const [expiry, signature] = token.split('.');

  // Extending your own session by a year is the attack this prevents.
  const extended = `${Number(expiry) + 365 * 24 * 60 * 60 * 1000}.${signature}`;
  assert.equal(await verifySessionToken(extended, SECRET), false);

  assert.equal(await verifySessionToken(expiry, SECRET), false, 'no signature');
  assert.equal(await verifySessionToken(`${expiry}.`, SECRET), false, 'empty signature');
  assert.equal(await verifySessionToken('notanumber.abc', SECRET), false);
});

/** Weekly and daily plans never divide cleanly, so compare within a cent. */
const near = (actual: number, expected: number, what: string) =>
  assert.ok(
    Math.abs(actual - expected) < 0.01,
    `${what}: got ${actual}, expected about ${expected}`
  );

test('monthlyCents normalises every recurring interval', () => {
  // $100/month is the baseline every other interval is compared against.
  assert.equal(monthlyCents(10_000, 'month', 1, 1), 10_000);
  assert.equal(monthlyCents(120_000, 'year', 1, 1), 10_000);
  near(monthlyCents(10_000, 'week', 1, 1), (10_000 * 52) / 12, 'weekly');
  near(monthlyCents(10_000, 'day', 1, 1), (10_000 * 365) / 12, 'daily');
});

test('monthlyCents handles interval_count and quantity', () => {
  assert.equal(monthlyCents(20_000, 'month', 2, 1), 10_000, 'billed 2-monthly');
  assert.equal(monthlyCents(24_000, 'year', 2, 1), 1_000, 'billed 2-yearly');
  assert.equal(monthlyCents(10_000, 'month', 1, 40), 400_000, '40 seats');
  assert.equal(monthlyCents(120_000, 'year', 1, 3), 30_000, 'seats on a yearly plan');
});

test('monthlyCents returns 0 rather than NaN for unusable input', () => {
  assert.equal(monthlyCents(null, 'month', 1, 1), 0);
  assert.equal(monthlyCents(10_000, null, 1, 1), 0);
  assert.equal(monthlyCents(10_000, 'fortnight', 1, 1), 0, 'unknown interval');
  assert.equal(monthlyCents(10_000, 'month', 0, 1), 10_000, 'zero count means 1');
  assert.equal(monthlyCents(10_000, 'month', 1, null), 10_000, 'no quantity means 1');
});

test('clientStatus maps Stripe status without inventing "At risk"', () => {
  const now = Date.UTC(2026, 8, 19);
  const daysAgo = (n: number) => (now - n * 24 * 60 * 60 * 1000) / 1000;

  assert.equal(clientStatus('past_due', { now }), 'Overdue');
  assert.equal(clientStatus('unpaid', { now }), 'Overdue');
  assert.equal(clientStatus('trialing', { now }), 'Trial');
  assert.equal(clientStatus('canceled', { now }), 'Churned');
  assert.equal(clientStatus('active', { now, created: daysAgo(10) }), 'New');
  assert.equal(clientStatus('active', { now, created: daysAgo(200) }), 'Active');
  assert.equal(
    clientStatus('active', { now, created: daysAgo(10), cancelAtPeriodEnd: true }),
    'Renewal',
    'a pending cancel outranks being new'
  );
});

test('sumByCurrency keeps currencies apart', () => {
  const totals = sumByCurrency([
    { cents: 1000, currency: 'aud' },
    { cents: 500, currency: 'AUD' },
    { cents: 250, currency: 'usd' },
  ]);

  assert.deepEqual(
    [...totals].sort((a, b) => a.currency.localeCompare(b.currency)),
    [
      { cents: 1500, currency: 'aud' },
      { cents: 250, currency: 'usd' },
    ],
    'case-insensitive, never added blindly across currencies'
  );
});
