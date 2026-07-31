import { useEffect, useState } from 'react';

// 'superadmin' | 'editor' | 'viewer' are the built-in roles; any other
// string is a custom role from the `roles` table, permissioned the same way
// as 'editor' via cms_editor_table_permissions.
export type CmsRole = string;

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
