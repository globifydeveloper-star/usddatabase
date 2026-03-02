'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { programColumns } from './config/program-column-config';

interface Program {
  id: number;
  unitid: string;
  cip_code: string | null;
  title: string | null;
  credential_level: string | null;
  credential_title: string | null;
  school_name: string | null;
  school_type: string | null;
}

const ProgramsPage = () => {
  return (
    <ComponentContainerCard title="Programs List">
      <Grid
        columns={programColumns}
        server={{
          url: '/api/programs',
          then: (data) =>
            data.data.map((row: Program) =>
              programColumns.map((col) => {
                if (col.id === 'action') {
                  return row.id; // pass id for edit/delete
                }

                return row[col.id as keyof Program] ?? '-';
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
  );
};

export default ProgramsPage;