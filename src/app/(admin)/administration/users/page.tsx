'use client';

import { useEffect, useState } from 'react';
import { Grid } from 'gridjs-react';
import Swal from 'sweetalert2';

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

useEffect(() => {
  const handleDeleteUser = async (event: any) => {
    const user = event.detail;

    const result = await Swal.fire({
       html: `Delete user <b><i>${user.full_name}</i></b>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      await Swal.fire({
        title: "Deleted!",
        text: "User has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      window.location.reload();

    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
      });
    }
  };

  window.addEventListener("deleteUser", handleDeleteUser);

  return () => {
    window.removeEventListener("deleteUser", handleDeleteUser);
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