'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// Global fetch interceptor: any API 401 with { message: 'Session expired' }
// means a superadmin force-logged this user out (or their account was
// otherwise deactivated) since the page loaded. Clears the session cookie,
// shows a one-time toast, and redirects to /login. Excludes the auth
// endpoints themselves to avoid intercepting login failures or the logout
// call this handler triggers.
const EXCLUDED_PATHS = ['/api/auth/login', '/api/auth/logout'];

let handledExpiry = false;

function getUrlString(input: RequestInfo | URL): string {
  if (!input) return '';
  if (typeof input === 'string') return input;
  if (input instanceof URL) return input.href;
  if (typeof input === 'object' && 'url' in input && typeof input.url === 'string') {
    return input.url;
  }
  return String(input);
}

export default function SessionGuard() {
  const router = useRouter();

  useEffect(() => {
    const originalFetch = window.fetch.bind(window);

    window.fetch = async (...args: Parameters<typeof fetch>) => {
      const response = await originalFetch(...args);

      const urlStr = getUrlString(args[0]);
      const isExcluded = !!urlStr && EXCLUDED_PATHS.some((path) => urlStr.includes(path));

      if (response.status === 401 && !isExcluded && !handledExpiry) {
        response
          .clone()
          .json()
          .then((body) => {
            if (body?.message === 'Session expired' && !handledExpiry) {
              handledExpiry = true;
              originalFetch('/api/auth/logout', { method: 'POST' }).finally(() => {
                toast.error('Your session has been terminated by a Superadmin.');
                router.push('/login');
              });
            }
          })
          .catch(() => {});
      }

      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [router]);

  return null;
}
