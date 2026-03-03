'use client';

import { useEffect, useState } from 'react';
import { Grid } from 'gridjs-react';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { User } from '@/types/user';

import EditUserModal from './components/EditUserModal';
import { userColumns } from './config/users-column-config';

const UsersPage = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState<User | null>(null);
  const [gridKey, setGridKey] = useState(0);

  useEffect(() => {
    const handleEdit = (event: Event) => {
      const customEvent = event as CustomEvent<User>;
      setSelectedRow(customEvent.detail);
      setShowEdit(true);
    };

    window.addEventListener('openEditModal', handleEdit);

    return () => {
      window.removeEventListener('openEditModal', handleEdit);
    };
  }, []);

  return (
    <>
      <ComponentContainerCard title="User List">
        <Grid
          key={gridKey}
          columns={userColumns}
          server={{
            url: '/api/users',
            then: (data) =>
              data.data.map((row: User) =>
                userColumns.map((col: { id: string }) => {
                  if (col.id === 'action') return row;

                  const value = row[col.id as keyof User];

                  if (value === null || value === undefined) return '-';

                  if (typeof value === 'boolean')
                    return value ? 'Active' : 'Inactive';

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

      <EditUserModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        data={selectedRow}
        onSuccess={() => setGridKey((prev) => prev + 1)}
      />
    </>
  );
};

export default UsersPage;