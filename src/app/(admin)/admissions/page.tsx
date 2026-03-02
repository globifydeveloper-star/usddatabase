'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/admission-column-config';

interface Admission {
  id: number;
  unitid: string;
  test_requirements: string | null;
  admission_rate: string | null;
}

const AdmissionsPage = () => {
  return (
    <ComponentContainerCard title="Admissions List">
      <Grid
        columns={studentColumns}
        server={{
          url: '/api/admissions',
          then: (data) =>
            data.data.map((row: Admission) =>
              studentColumns.map((col) => {
                if (col.id === 'action') {
                  return row.id;
                }

                return row[col.id as keyof Admission] ?? '-';
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
  );
};

export default AdmissionsPage;