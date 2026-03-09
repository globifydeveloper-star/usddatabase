'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/repayment-column-config';
import { Repayment } from '@/types/repayment';
import { useEffect, useState } from 'react';
import EditRepaymentModal from './components/EditRepaymentModal';

const RepaymentPage = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Repayment | null>(null);
  const [gridKey, setGridKey] = useState(0);

  useEffect(() => {
    const handleEdit = (event: Event) => {
      const customEvent = event as CustomEvent<Repayment>;
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
      <ComponentContainerCard title="Repayment List">
        <Grid
          key={gridKey}
          columns={studentColumns}
          server={{
            url: '/api/repayment',
            then: (data) =>
              data.data.map((row: Repayment) =>
                studentColumns.map((col) => {
                  if (col.id === 'action') {
                    return row;
                  } else {
                    return row[col.id as keyof Repayment];
                  }
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

      <EditRepaymentModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        data={selectedRow}
        onSuccess={() => setGridKey((prev) => prev + 1)}
      />
    </>
  );
};

export default RepaymentPage;