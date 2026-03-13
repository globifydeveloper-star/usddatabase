'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/student-column-config';
import EditStudentsModal from './components/EditStudentsModal';

import { useEffect, useState } from 'react';
import { Student } from '@/types/student';
import Swal from 'sweetalert2';

const StudentsPage = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Student | null>(null);
  const [gridKey, setGridKey] = useState(0);

  /* ---------- EDIT ---------- */

  useEffect(() => {
    const handleEdit = (event: Event) => {
      const customEvent = event as CustomEvent<Student>;
      setSelectedRow(customEvent.detail);
      setShowEdit(true);
    };

    window.addEventListener('openEditModal', handleEdit);

    return () => {
      window.removeEventListener('openEditModal', handleEdit);
    };
  }, []);

  /* ---------- DELETE ---------- */

  useEffect(() => {
    const handleDeleteStudent = async (event: any) => {
      const student = event.detail;

      const result = await Swal.fire({
        html: `Delete student record for <b><i>${student.unitid}</i></b>?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it!',
      });

      if (!result.isConfirmed) return;

      try {
        const res = await fetch(`/api/students/${student.unitid}`, {
          method: 'DELETE',
        });

        if (!res.ok) throw new Error('Delete failed');

        await Swal.fire({
          title: 'Deleted!',
          text: 'Student record deleted.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });

        setGridKey((prev) => prev + 1);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error',
        });
      }
    };

    window.addEventListener('deleteStudent', handleDeleteStudent);

    return () => {
      window.removeEventListener('deleteStudent', handleDeleteStudent);
    };
  }, []);

  return (
    <>
      <ComponentContainerCard title="Students List">

        {/* TOOLBAR */}
        <div className="grid-toolbar">
          <button
            className="btn btn-primary"
            onClick={() => {
              setSelectedRow(null);
              setShowEdit(true);
            }}
          >
            Add New Student Data
          </button>
        </div>

        <Grid
          key={gridKey}
          columns={studentColumns}
          server={{
            url: '/api/students',
            then: (data) =>
              data.data.map((row: Student) =>
                studentColumns.map((col) => {
                  if (col.id === 'action') {
                    return row;
                  } else {
                    return row[col.id as keyof Student];
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

      <EditStudentsModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        data={selectedRow}
        onSuccess={() => setGridKey((prev) => prev + 1)}
      />
    </>
  );
};

export default StudentsPage;