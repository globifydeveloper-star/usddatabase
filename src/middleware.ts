import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken, AUTH_COOKIE_NAME } from '@/lib/jwt';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|login|api/auth/login|api/auth/logout).*)'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApi = pathname.startsWith('/api/');

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const auth = token ? await verifyAuthToken(token) : null;

  if (!auth) {
    if (isApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Extra path-specific gate for user/permission management, on top of the
  // per-handler superadmin checks in the cms-users API routes themselves.
  if (pathname === '/cms-users' || pathname.startsWith('/api/cms-users')) {
    if (auth.role !== 'superadmin') {
      return isApi
        ? NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        : NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Forward the verified identity to downstream route handlers via request
  // headers so they don't need to re-verify the JWT themselves. These are
  // always overwritten here, so a client cannot spoof them.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-cms-user-id', String(auth.userId));
  requestHeaders.set('x-cms-email', auth.email);
  requestHeaders.set('x-cms-role', auth.role);

  return NextResponse.next({ request: { headers: requestHeaders } });
}
