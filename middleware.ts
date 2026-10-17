import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, sessionSecret, verifySessionToken } from '@/lib/admin/auth';
import { markdownDecision, markdownHeaders, prefersMarkdown } from '@/lib/agent';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (prefersMarkdown(request.headers.get('accept'))) {
    const decision = markdownDecision(pathname);
    if (decision.kind === 'document') {
      return new NextResponse(decision.body, {
        status: decision.status,
        headers: markdownHeaders(decision.status),
      });
    }
  }

  const isAdminArea =
    pathname === '/admin' ||
    (pathname.startsWith('/admin/') && !pathname.startsWith('/admin/login'));
  if (!isAdminArea) return NextResponse.next();

  const valid = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value,
    sessionSecret()
  );
  if (valid) return NextResponse.next();

  const login = new URL('/admin/login', request.url);
  // Come back to where they were headed once they are in.
  if (pathname !== '/admin') {
    login.searchParams.set('next', pathname);
  }
  return NextResponse.redirect(login);
}

export const config = {
  // Pages only. Files with an extension (sitemap, icons, llms.txt) stay on
  // their own handlers. Admin login is allowed through inside the function.
  matcher: ['/((?!_next/static|_next/image|.*\\..*).*)'],
};
