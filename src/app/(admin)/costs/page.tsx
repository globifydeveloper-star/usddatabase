'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/costs-column-config';
import { Costs } from '@/types/costs';
import { useEffect, useState } from 'react';
import EditCostsModal from './components/EditCostsModal'
import Swal from 'sweetalert2';

const CostsPage = () => {
  const [showEdit, setShowEdit] = useState (false);
    const [selectedRow, setSelectedRow] = useState<Costs | null>(null);
    const [gridKey, setGridKey] = useState(0);
  
     /* ---------- EDIT ---------- */
    useEffect(() => {
      const handleEdit = (event: Event) => {
        const customEvent = event as CustomEvent<Costs>;
        setSelectedRow(customEvent.detail);
        setShowEdit(true);
      };
  
      window.addEventListener('openEditModal', handleEdit);
  
      return () => {
        window.removeEventListener('openEditModal', handleEdit);
      };
    }, []);
    useEffect(() => {
              const handleDeleteCost = async (event: any) => {
                const cost = event.detail;
          
                const result = await Swal.fire({
                  html: `Delete costs record for <b><i>${cost.unitid}</i></b>?`,
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#ef4444',
                  cancelButtonColor: '#6b7280',
                  confirmButtonText: 'Yes, delete it!',
                });
          
                if (!result.isConfirmed) return;
          
                try {
                  const res = await fetch(`/api/costs/${cost.unitid}`, {
                    method: 'DELETE',
                  });
          
                  if (!res.ok) throw new Error('Delete failed');
          
                  await Swal.fire({
                    title: 'Deleted!',
                    text: 'Costs record deleted.',
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
          
              window.addEventListener('deleteCost', handleDeleteCost);
          
              return () => {
                window.removeEventListener('deleteCost', handleDeleteCost);
              };
            }, []);
  return (
    <>
    <ComponentContainerCard title="Costs List">
       {/* TOOLBAR */}
        <div className="grid-toolbar">
          <button
            className="btn btn-primary"
            onClick={() => {
              setSelectedRow(null);
              setShowEdit(true);
            }}
          >
            Add New Costs Data
          </button>
        </div>
      <Grid
      key={gridKey}
        columns={studentColumns}
        server={{
          url: '/api/costs',
          then: (data) =>
            data.data.map((row: Costs) =>
              studentColumns.map((col) => {
                if (col.id === 'action') {
                   return row;
                   } else {
                   return row[col.id as keyof Costs];
                }
              })
            ),
          total: (data) => data.total,
        }}
        pagination={{
          limit: 20, //  match API default
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
     <EditCostsModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        data={selectedRow}
        onSuccess={() => setGridKey((prev) => prev + 1)}
      />

    </>
  );
};

export default CostsPage;