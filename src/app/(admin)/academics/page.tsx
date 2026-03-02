'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/academics-column-config';

interface Academics {
  unitid: number;
  assoc: boolean | null;
  degree: boolean | null;
  bachelors: boolean | null;
  certificate_lt_1yr: boolean | null;
  certificate_lt_2yr: boolean | null;
  certificate_lt_4yr: boolean | null;
  degree_or_certificate: boolean | null;
}

const AcademicsPage = () => {
  return (
    <ComponentContainerCard title="Academics List">
     <Grid
  columns={studentColumns}
  server={{
    url: '/api/academics',
    then: (data) =>
      data.data.map((row: Academics) =>
        studentColumns.map((col: { id: string }) => {
          if (col.id === 'action') {
            return row.unitid; // use unitid as unique identifier
          }

          const value = row[col.id as keyof Academics];

          // Handle null / undefined
          if (value === null || value === undefined) {
            return '-';
          }

          // Handle boolean fields (VERY IMPORTANT)
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
  );
};

export default AcademicsPage;