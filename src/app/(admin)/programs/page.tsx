'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { programColumns } from './config/program-column-config';
import EditProgramsModal from './components/EditProgramsModal';

import { useEffect, useState } from 'react';
import { Program } from '@/types/programs';

const ProgramsPage = () => {

  const [showEdit, setShowEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Program | null>(null);
  const [gridKey, setGridKey] = useState(0);

  useEffect(() => {
    const handleEdit = (event: Event) => {
      const customEvent = event as CustomEvent<Program>;
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
      <ComponentContainerCard title="Programs List">

        <Grid
          key={gridKey}
          columns={programColumns}

          server={{
            url: '/api/programs',

            then: (data) =>
              data.data.map((row: Program) =>
                programColumns.map((col) => {
                  if (col.id === 'action') {
                    return row;
                  } else {
                    return row[col.id as keyof Program];
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

      <EditProgramsModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        data={selectedRow}
        onSuccess={() => setGridKey((prev) => prev + 1)}
      />

    </>
  );
};

export default ProgramsPage;