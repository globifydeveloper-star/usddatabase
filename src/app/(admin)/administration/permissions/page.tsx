'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { permissionsColumns } from './config/permissions-column-config';

interface Permissions {
  id: number;
  unitid: number;
  user_id: number | null;
  table_name: string | null;
  can_read: boolean;
  can_edit: boolean;
  can_delete: boolean;

}

const PermissionsPage = () => {
  return (
    <ComponentContainerCard title="Permissions List">
      <Grid
        columns={permissionsColumns}
        server={{
          url: '/api/permissions',
          then: (data) =>
            data.data.map((row: Permissions) =>
              permissionsColumns.map((col: { id: string }) => {
                if (col.id === 'action') {
                  return row.unitid;
                }

                const value = row[col.id as keyof Permissions];

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

export default PermissionsPage;