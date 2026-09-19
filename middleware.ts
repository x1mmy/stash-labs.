import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, sessionSecret, verifySessionToken } from '@/lib/admin/auth';

export async function middleware(request: NextRequest) {
  const valid = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value,
    sessionSecret()
  );
  if (valid) return NextResponse.next();

  const login = new URL('/admin/login', request.url);
  // Come back to where they were headed once they are in.
  if (request.nextUrl.pathname !== '/admin') {
    login.searchParams.set('next', request.nextUrl.pathname);
  }
  return NextResponse.redirect(login);
}

export const config = {
  // Everything under /admin except the login page itself.
  matcher: ['/admin', '/admin/((?!login).*)'],
};
