/**
 * Admin auth: one shared login, no auth library, no session store.
 *
 * The login is a straight comparison against ADMIN_EMAIL and ADMIN_PASSWORD.
 * The session cookie is still signed, so it cannot be forged by anyone who
 * has not seen the signing key.
 *
 * Everything here is Web Crypto (`crypto.subtle`) rather than `node:crypto`,
 * so the identical helpers run in the edge middleware and in Server Actions
 * without a runtime directive on either.
 */

export const SESSION_COOKIE = 'sl_admin';
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const enc = new TextEncoder();

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Compares two strings without leaking, through timing, how much of them
 * matched. Length is compared first and so is leaked - for an email address
 * that is not a secret worth protecting.
 */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * The key the session cookie is signed with.
 *
 * ADMIN_SESSION_SECRET when set, otherwise derived from the credentials so the
 * dashboard works with only ADMIN_EMAIL and ADMIN_PASSWORD configured. That
 * fallback is only as strong as the password: anyone who can guess it offline
 * can mint a valid cookie, so set ADMIN_SESSION_SECRET (openssl rand -hex 32)
 * in production. Changing either value signs everyone out.
 */
export function sessionSecret(): string | undefined {
  const explicit = process.env.ADMIN_SESSION_SECRET;
  if (explicit) return explicit;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  return email && password ? `${email}:${password}` : undefined;
}

async function hmac(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return toHex(await crypto.subtle.sign('HMAC', key, enc.encode(message)));
}

/**
 * The cookie value is `<expiry>.<HMAC(expiry)>` - the expiry is readable, and
 * moving it invalidates the signature. No session store to keep in sync.
 */
export async function createSessionToken(
  secret: string,
  now: number = Date.now()
): Promise<string> {
  const expiry = String(now + SESSION_TTL_MS);
  return `${expiry}.${await hmac(expiry, secret)}`;
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string | undefined,
  now: number = Date.now()
): Promise<boolean> {
  if (!token || !secret) return false;
  const [expiry, signature] = token.split('.');
  if (!expiry || !signature) return false;
  const expiresAt = Number(expiry);
  if (!Number.isFinite(expiresAt) || expiresAt < now) return false;
  return timingSafeEqual(await hmac(expiry, secret), signature);
}
