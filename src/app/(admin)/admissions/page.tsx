'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/admission-column-config';
import EditAdmissionsModal  from './components/EditAdmissionsModal';
import { useEffect, useState } from 'react';
interface Admission {
  id: number;
  unitid: string;
  test_requirements: number | null;
  admission_rate: number | null;
}

const AdmissionsPage = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Admission | null>(null);
  const [gridKey, setGridKey] = useState(0);
  useEffect(() => {
    const handleEdit = (event: Event) => {
      const customEvent = event as CustomEvent<Admission>;
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
    <ComponentContainerCard title="Admissions List">
      <Grid
  key={gridKey}
columns={studentColumns}
server={{
  url: '/api/admissions',
  then: (data) =>
    data.data.map((row: Admission) =>
      studentColumns.map((col) => {
        if (col.id === 'action') {
          return row;
        } else {
          return row[col.id as keyof Admission];
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