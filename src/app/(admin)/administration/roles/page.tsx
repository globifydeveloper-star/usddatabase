'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { rolesColumns } from './config/roles-column-config';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import EditRoleModal from './components/EditRoleModal';

interface Roles {
  id: number;
  role_name: string;
}

const RolesPage = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Roles | null>(null);
  const [gridKey, setGridKey] = useState(0);

  useEffect(() => {
    const handleEdit = (event: Event) => {
      const customEvent = event as CustomEvent<Roles>;
      setSelectedRow(customEvent.detail);
      setShowEdit(true);
    };

    window.addEventListener('openEditModal', handleEdit);

    return () => {
      window.removeEventListener('openEditModal', handleEdit);
    };
  }, []);

  useEffect(() => {
    const handleDeleteRole = async (event: Event) => {
      const customEvent = event as CustomEvent<Roles>;
      const role = customEvent.detail;

      const result = await Swal.fire({
        title: 'Delete Role?',
        text: role.role_name,
        icon: 'warning',
        showCancelButton: true,
      });

      if (!result.isConfirmed) return;

      await fetch(`/api/roles/${role.id}`, {
        method: 'DELETE',
      });

      setGridKey((prev) => prev + 1);
    };

    window.addEventListener('deleteRole', handleDeleteRole);

    return () => {
      window.removeEventListener('deleteRole', handleDeleteRole);
    };
  }, []);
  return (
    <>
      <ComponentContainerCard title="Role List">
        <div className="grid-toolbar">
          <button
            className="btn btn-primary"
            onClick={() => {
              setSelectedRow(null);
              setShowEdit(true);
            }}
          >
            Add New Role
          </button>
        </div>
        <Grid
          key={gridKey}
          columns={rolesColumns}
          server={{
            url: '/api/roles',
            then: (data) =>
              data.data.map((row: Roles) =>
                rolesColumns.map((col: { id: string }) => {
                  if (col.id === 'action') {
                    return row;
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
      <EditRoleModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        data={selectedRow}
        onSuccess={() => setGridKey((prev) => prev + 1)}
      />
    </>
  );
};

export default RolesPage;
