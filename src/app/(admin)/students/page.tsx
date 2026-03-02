'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/student-column-config';

interface Student {
  id: number;
  unitid: string;
  size: string | null;
  grad_students: string | null;
  enrollment_grad_12_month: string | null;
  enrollment_undergrad_12_month: string | null;
  fafsa_applications: string | null;
  demographics_men: string | null;
  demographics_women: string | null;
  faculty_men: string | null;
  faculty_women: string | null;

}

const StudentsPage = () => {
  return (
    <ComponentContainerCard title="Students List">
      <Grid
        columns={studentColumns}
        server={{
          url: '/api/students',
          then: (data) =>
            data.data.map((row: Student) =>
              studentColumns.map((col) => {
                if (col.id === 'action') {
                  return row.id;
                }

                return row[col.id as keyof Student] ?? '-';
              })
            ),
          total: (data) => data.total,
        }}
        pagination={{
          limit: 20, // ✅ match API default
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

export default StudentsPage;