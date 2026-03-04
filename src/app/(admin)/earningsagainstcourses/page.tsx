'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/earningsagainstcourses-column-config';

interface EarningsAgainstCourses {
  unitid: number;
  ope8_id: number | null;
  school_name: string | null;
  cip_code: string | null;
  cip_title: string | null;
  grad_cohort: number | null;
  year_1: number | null;
  year_5: number | null;
  year_10: number | null;
  credential_level: string | null;
  credential_title: string | null;
 
}

const EarningsagainstcoursesPage = () => {
  return (
    <ComponentContainerCard title="Earnings Against Courses List">
      <Grid
        columns={studentColumns}
        server={{
          url: '/api/earningsagainstcourses',
          then: (data) =>
            data.data.map((row: EarningsAgainstCourses) =>
              studentColumns.map((col) => {
                if (col.id === 'action') {
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
  );
};

export default EarningsagainstcoursesPage;