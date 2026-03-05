'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/academics-column-config';
import EditAcademicsModal from './components/EditAcademicsModal';

import { useEffect, useState } from 'react';
import { Academics } from '@/types/academics';



const AcademicsPage = () => {
  const [showEdit, setShowEdit] = useState(false);
        const [selectedRow, setSelectedRow] = useState<Academics | null>(null);
        const [gridKey, setGridKey] = useState(0);
        useEffect(() => {
          const handleEdit = (event: Event) => {
            const customEvent = event as CustomEvent<Academics>;
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
    <ComponentContainerCard title="Academics List">
     <Grid
     key={gridKey}
  columns={studentColumns}
  server={{
    url: '/api/academics',
   then: (data) =>
  data.data.map((row: Academics) =>
    studentColumns.map((col: { id: string }) => {

      if (col.id === 'action') {
        return row;
      }

      const value = row[col.id as keyof Academics];

      if (value === null || value === undefined) {
        return '-';
      }

      if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
      }

      return value;
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
<EditAcademicsModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        data={selectedRow}
        onSuccess={() => setGridKey((prev) => prev + 1)}
      />
    </>
  );
};

export default AcademicsPage;