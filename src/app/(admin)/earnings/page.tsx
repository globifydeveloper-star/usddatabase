'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/earnings-column-config';

interface Earnings {
  unitid: number;
  median_1yr: number | null;
  median_3yr: number | null;
  median_4yr: number | null;
  median_5yr: number | null;
  students_count: number | null;
 
}

const EarningsPage = () => {
  return (
    <ComponentContainerCard title="Earnings List">
      <Grid
        columns={studentColumns}
        server={{
          url: '/api/earnings',
          then: (data) =>
            data.data.map((row: Earnings) =>
              studentColumns.map((col) => {
                if (col.id === 'action') {
                }

                return row[col.id as keyof Earnings] ?? '-';
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

export default EarningsPage;