'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/admission-column-config';
import EditAdmissionsModal from './components/EditAdmissionsModal';
import { useEffect, useState } from 'react';
import { Admissions } from '@/types/admissions';
import Swal from 'sweetalert2';

const AdmissionsPage = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Admissions | null>(null);
  const [gridKey, setGridKey] = useState(0);

  useEffect(() => {
    const handleEdit = (event: Event) => {
      const customEvent = event as CustomEvent<Admissions>;
      setSelectedRow(customEvent.detail);
      setShowEdit(true);
    };

    window.addEventListener('openEditModal', handleEdit);

    return () => {
      window.removeEventListener('openEditModal', handleEdit);
    };
  }, []);

  useEffect(() => {
    const handleDeleteAdmission = async (event: any) => {
      const admission = event.detail;

      const result = await Swal.fire({
        html: `Delete admission for <b><i>${admission.unitid}</i></b>?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      try {
        const res = await fetch(`/api/admissions/${admission.unitid}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Delete failed");

        await Swal.fire({
          title: "Deleted!",
          text: "Admission has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        setGridKey((prev) => prev + 1); // refresh grid

      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
        });
      }
    };

    window.addEventListener("deleteAdmission", handleDeleteAdmission);

    return () => {
      window.removeEventListener("deleteAdmission", handleDeleteAdmission);
    };
  }, []);

  return (
    <>
      <ComponentContainerCard title="Admissions List">

        <div className="grid-toolbar">
          <button
            className="btn btn-primary"
            onClick={() => {
              setSelectedRow(null);
              setShowEdit(true);
            }}
          >
            Add New Admission Data
          </button>
        </div>

        <Grid
          key={gridKey}
          columns={studentColumns}
          server={{
            url: '/api/admissions',
            then: (data) =>
              data.data.map((row: Admissions) =>
                studentColumns.map((col) => {
                  if (col.id === 'action') {
                    return row;
                  } else {
                    return row[col.id as keyof Admissions];
                  }
                })
              ),
            total: (data) => data.total,
          }}
          pagination={{
            limit: 20,
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

      <EditAdmissionsModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        data={selectedRow}
        onSuccess={() => setGridKey((prev) => prev + 1)}
      />
    </>
  );
};

export default AdmissionsPage;