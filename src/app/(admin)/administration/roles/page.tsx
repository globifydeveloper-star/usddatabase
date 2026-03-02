'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { rolesColumns } from './config/roles-column-config';

interface Roles {
  id: number;
  role_name: string;
}

const RolesPage = () => {
  return (
    <ComponentContainerCard title="Role List">
      <Grid
        columns={rolesColumns}
        server={{
          url: '/api/roles',
          then: (data) =>
            data.data.map((row: Roles) =>
              rolesColumns.map((col: { id: string }) => {
                if (col.id === 'action') {
                  return row.id;
                }

                const value = row[col.id as keyof Roles];

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

export default RolesPage;