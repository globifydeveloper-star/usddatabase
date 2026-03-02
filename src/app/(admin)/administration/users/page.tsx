'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { userColumns } from './config/users-column-config';

interface User {
  id: number;
  full_name: string;
  email: string;
  role_id: number;
  is_active: boolean | null;
  last_login: string | null;
  created_at: string | null;
  updated_at: string | null;
}

const UsersPage = () => {
  return (
    <ComponentContainerCard title="User List">
      <Grid
        columns={userColumns}
        server={{
          url: '/api/users',
          then: (data) =>
            data.data.map((row: User) =>
              userColumns.map((col: { id: string }) => {
                if (col.id === 'action') {
                  return row.id;
                }

                const value = row[col.id as keyof User];

                if (value === null || value === undefined) {
                  return '-';
                }

                // Boolean formatting
                if (typeof value === 'boolean') {
                  return value ? 'Active' : 'Inactive';
                }

                return value;
              })
            ),
          total: (data) => data.total,
        }}
        pagination={{
          limit: 10,
          server: {
            url: (prev, page, limit) => {
              const url = new URL(prev, window.location.origin);
              url.searchParams.set('page', String(page + 1));
              url.searchParams.set('limit', String(limit));
              return url.pathname + '?' + url.searchParams.toString();
            },
          },
        }}
        search={{
          server: {
            url: (prev, keyword) => {
              const url = new URL(prev, window.location.origin);
              url.searchParams.set('search', keyword);
              url.searchParams.set('page', '1');
              return url.pathname + '?' + url.searchParams.toString();
            },
          },
        }}
      />
    </ComponentContainerCard>
  );
};

export default UsersPage;