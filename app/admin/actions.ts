'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  SESSION_COOKIE,
  SESSION_TTL_MS,
  createSessionToken,
  sessionSecret,
  timingSafeEqual,
} from '@/lib/admin/auth';

// ponytail: per-instance, in-memory throttle. On serverless each instance has
// its own counter, so a determined attacker gets more attempts than this
// suggests. Upgrade to Neon or Upstash when there is a shared store to use.
const attempts = new Map<string, { count: number; until: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60 * 1000;

function throttled(ip: string): boolean {
  const now = Date.now();
  const record = attempts.get(ip);
  if (!record || record.until < now) {
    attempts.set(ip, { count: 1, until: now + WINDOW_MS });
    return false;
  }
  record.count += 1;
  return record.count > MAX_ATTEMPTS;
}

export async function login(
  _state: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const ip = headers().get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  if (throttled(ip)) {
    return { error: 'Too many attempts. Try again in a few minutes.' };
  }

  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();
  const password = String(formData.get('password') ?? '');
  const next = String(formData.get('next') ?? '/admin');

  const expectedEmail = (process.env.ADMIN_EMAIL ?? '').trim().toLowerCase();
  const expectedPassword = process.env.ADMIN_PASSWORD ?? '';
  const secret = sessionSecret();
  if (!expectedEmail || !expectedPassword || !secret) {
    return { error: 'Admin login is not configured on this deployment.' };
  }

  // Both checks always run, so a wrong email and a wrong password cost the same.
  const emailOk = timingSafeEqual(email, expectedEmail);
  const passwordOk = timingSafeEqual(password, expectedPassword);
  if (!emailOk || !passwordOk) {
    return { error: 'Those details do not match.' };
  }

  cookies().set(SESSION_COOKIE, await createSessionToken(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  });

  redirect(next.startsWith('/admin') ? next : '/admin');
}

export async function logout(): Promise<void> {
  cookies().delete(SESSION_COOKIE);
  redirect('/admin/login');
}
