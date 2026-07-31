import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken, AUTH_COOKIE_NAME } from '@/lib/jwt';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|login|api/auth/login|api/auth/logout).*)'],
};

function canAccessRole(role: string | undefined, required: 'editor' | 'superadmin') {
  if (required === 'superadmin') {
    return role === 'superadmin';
  }

  return role === 'superadmin' || role === 'editor';
}

function clearAuthCookie(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return response;
}

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

  // Middleware performs route gating based on the verified JWT payload.
  // Database-backed checks such as force logout and table permissions remain
  // in the API handlers (via getAuthContext) where Node runtime access is available.
  //
  // The three *page* routes below are "soft-gated": a viewer who is denied
  // still gets the page shell (which renders an access-denied alert) instead
  // of a silent redirect to /dashboard. Their API counterparts are still
  // hard-gated below — a soft-gated page with no data is harmless, a 403
  // being bypassed is not.
  const softGatedPages = ['/cms-users', '/login-history', '/cms-audit-logs'];
  const editorAllowedPaths = ['/cms-users', '/api/cms-users', '/login-history', '/api/cms-login-history'];
  const auditLogsPages = ['/cms-audit-logs'];
  const auditLogsApiPrefixes = ['/api/cms-audit-logs'];
  const loginHistoryPages = ['/login-history'];
  const loginHistoryApiPrefixes = ['/api/cms-login-history'];

  let requiresSuperadmin = false;
  let requiresEditorOrAbove = false;
  let requiresAuditLogsAccess = false;
  let requiresLoginHistoryAccess = false;

  const isSuperadminOnlyCmsUsersApi =
    pathname === '/api/cms-users/permissions' ||
    pathname === '/api/cms-users/available-tables';
  const isCmsUsersApi = pathname.startsWith('/api/cms-users');

  if (isSuperadminOnlyCmsUsersApi) {
    requiresSuperadmin = true;
  } else if (editorAllowedPaths.includes(pathname) || isCmsUsersApi) {
    requiresEditorOrAbove = true;
  } else if (
    auditLogsPages.includes(pathname) ||
    auditLogsApiPrefixes.some((p) => pathname.startsWith(p))
  ) {
    requiresAuditLogsAccess = true;
  } else if (
    loginHistoryPages.includes(pathname) ||
    loginHistoryApiPrefixes.some((p) => pathname.startsWith(p))
  ) {
    requiresLoginHistoryAccess = true;
  }

  const isSoftGatedPage = !isApi && softGatedPages.includes(pathname);

  if (requiresAuditLogsAccess && !canAccessRole(auth.role, 'editor')) {
    if (isApi) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    if (!isSoftGatedPage) return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (requiresSuperadmin && !canAccessRole(auth.role, 'superadmin')) {
    if (isApi) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    if (!isSoftGatedPage) return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if (requiresEditorOrAbove && !canAccessRole(auth.role, 'editor')) {
    if (isApi) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    if (!isSoftGatedPage) return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-cms-user-id', String(auth.userId));
  requestHeaders.set('x-cms-email', auth.email);
  requestHeaders.set('x-cms-role', auth.role);
  requestHeaders.set('x-cms-session-version', String(auth.sessionVersion));

  return NextResponse.next({ request: { headers: requestHeaders } });
}
