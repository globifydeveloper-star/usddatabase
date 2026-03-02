'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/aid-column-config';

interface Aid {
  id: number;
  unitid: string;
  loan_principal: string | null;
  pell_grant_rate: string | null;
  federal_loan_rate: string | null;
  students_with_any_loan: string | null;
}

const AidPage = () => {
  return (
    <ComponentContainerCard title="Aid List">
      <Grid
        columns={studentColumns}
        server={{
          url: '/api/aid',
          then: (data) =>
            data.data.map((row: Aid) =>
              studentColumns.map((col) => {
                if (col.id === 'action') {
                  return row.unitid;
                }

                return row[col.id as keyof Aid] ?? '-';
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

export default AidPage;