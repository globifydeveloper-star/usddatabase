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

  // Extra path-specific gates for user/permission management and the
  // security pages, on top of the per-handler checks in those API routes
  // themselves.
  //
  // /cms-users and /api/cms-users (exact — list + create) allow editors in
  // too, since editors can view the table and create viewer-only accounts;
  // the route handlers enforce the "viewer only" part. Everything else
  // under /api/cms-users/* (edit/delete/force-logout/permissions/
  // available-tables) plus login-history/audit-logs stay superadmin-only.
  const editorAllowedPaths = ['/cms-users', '/api/cms-users'];
  const superadminOnlyPages = ['/login-history', '/cms-audit-logs'];
  const superadminOnlyApiPrefixes = ['/api/cms-login-history', '/api/cms-audit-logs'];

  let requiresSuperadmin = false;
  let requiresEditorOrAbove = false;

  if (editorAllowedPaths.includes(pathname)) {
    requiresEditorOrAbove = true;
  } else if (pathname.startsWith('/api/cms-users/')) {
    requiresSuperadmin = true;
  } else if (
    superadminOnlyPages.includes(pathname) ||
    superadminOnlyApiPrefixes.some((p) => pathname.startsWith(p))
  ) {
    requiresSuperadmin = true;
  }

  if (requiresSuperadmin && auth.role !== 'superadmin') {
    return isApi
      ? NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      : NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if (requiresEditorOrAbove && auth.role !== 'superadmin' && auth.role !== 'editor') {
    return isApi
      ? NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      : NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Forward the verified identity to downstream route handlers via request
  // headers so they don't need to re-verify the JWT themselves. These are
  // always overwritten here, so a client cannot spoof them.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-cms-user-id', String(auth.userId));
  requestHeaders.set('x-cms-email', auth.email);
  requestHeaders.set('x-cms-role', auth.role);
  if (auth.iat !== undefined) {
    requestHeaders.set('x-cms-issued-at', String(auth.iat));
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}
