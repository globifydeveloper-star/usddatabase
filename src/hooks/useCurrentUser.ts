import { useEffect, useState } from 'react';

export type CmsRole = 'superadmin' | 'editor' | 'viewer';

export interface CurrentUser {
  userId: number;
  email: string;
  role: CmsRole;
  permittedTables: string[] | null;
}

// undefined = loading, null = unauthenticated, else the current user.
export function useCurrentUser(): CurrentUser | null | undefined {
  const [user, setUser] = useState<CurrentUser | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled) setUser(data);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return user;
}
