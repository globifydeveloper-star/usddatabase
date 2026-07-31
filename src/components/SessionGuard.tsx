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

export default function SessionGuard() {
  const router = useRouter();

  useEffect(() => {
    const originalFetch = window.fetch.bind(window);

    window.fetch = async (...args: Parameters<typeof fetch>) => {
      const response = await originalFetch(...args);

      const url = typeof args[0] === 'string' ? args[0] : (args[0] as Request).url;
      const isExcluded = EXCLUDED_PATHS.some((path) => url.includes(path));

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
