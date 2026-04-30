'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/debt-income-ratio-column-config';
import { DebtIncomeRatio } from '@/types/debtIncomeRatio';
import { useEffect, useState } from 'react';
import EditDebtIncomeRatioModal from './components/EditDebtIncomeRatioModal';
import Swal from 'sweetalert2';

const DebtIncomeRatioPage = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DebtIncomeRatio | null>(null);
  const [gridKey, setGridKey] = useState(0);

  useEffect(() => {
    const handleEdit = (event: Event) => {
      const customEvent = event as CustomEvent<DebtIncomeRatio>;
      setSelectedRow(customEvent.detail);
      setShowEdit(true);
    };

    window.addEventListener('openEditDebtIncomeRatioModal', handleEdit);

    return () => {
      window.removeEventListener('openEditDebtIncomeRatioModal', handleEdit);
    };
  }, []);

  useEffect(() => {
    const handleDelete = async (event: any) => {
      const row = event.detail;

      const result = await Swal.fire({
        html: `Delete debt income ratio record for <b><i>${row.unitid}</i></b>?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it!',
      });

      if (!result.isConfirmed) return;

      try {
        const res = await fetch(`/api/debt-income-ratio/${row.unitid}`, {
          method: 'DELETE',
        });

        if (!res.ok) throw new Error('Delete failed');

        await Swal.fire({
          title: 'Deleted!',
          text: 'Debt income ratio record deleted.',
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

    window.addEventListener('deleteDebtIncomeRatio', handleDelete);

    return () => {
      window.removeEventListener('deleteDebtIncomeRatio', handleDelete);
    };
  }, []);

  return (
    <>
      <ComponentContainerCard title="Debt Income Ratio List">
        <div className="grid-toolbar">
          <button
            className="btn btn-primary"
            onClick={() => {
              setSelectedRow(null);
              setShowEdit(true);
            }}
          >
            Add New Debt Income Ratio Data
          </button>
        </div>

        <Grid
          key={gridKey}
          columns={studentColumns}
          server={{
            url: '/api/debt-income-ratio',
            then: (data) =>
              data.data.map((row: DebtIncomeRatio) =>
                studentColumns.map((col) => {
                  if (col.id === 'action') {
                    return row;
                  }
                  return row[col.id as keyof DebtIncomeRatio];
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

      <EditDebtIncomeRatioModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        data={selectedRow}
        onSuccess={() => setGridKey((prev) => prev + 1)}
      />
    </>
  );
};

export default DebtIncomeRatioPage;
