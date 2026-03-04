'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/earningsagainstcourses-column-config';
import EditearningsagainstModal from './components/EditearningsagainstModal'; 
import { useEffect, useState } from 'react';

const EarningsagainstcoursesPage = () => {


  const [showEdit, setShowEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState<EarningsAgainstCourses | null>(null);
  const [gridKey, setGridKey] = useState(0);


  useEffect(() => {
    const handleEdit = (event: Event) => {
      const customEvent = event as CustomEvent<EarningsAgainstCourses>;
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
    <ComponentContainerCard title="Earnings Against Courses List">
      <Grid
      key={gridKey}
        columns={studentColumns}
        server={{
          url: '/api/earningsagainstcourses',
          then: (data) =>
            data.data.map((row: EarningsAgainstCourses) =>
              studentColumns.map((col) => {
                if (col.id === 'action') {
                  return row;
                }

                return row[col.id as keyof EarningsAgainstCourses] ?? '-';
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
     <EditearningsagainstModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        data={selectedRow}
        onSuccess={() => setGridKey((prev) => prev + 1)}
      />
    </>
  );
};

export default EarningsagainstcoursesPage;