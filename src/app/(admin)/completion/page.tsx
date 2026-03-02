'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/completion-column-config';

interface Completion {
  id: number;
  unitid: string;
  completed_2yrs: string | null;
  completed_3yrs: string | null;
  completed_4yrs: string | null;
  completed_6yrs: string | null;
}

const CompletionPage = () => {
  return (
    <ComponentContainerCard title="Completion List">
      <Grid
        columns={studentColumns}
        server={{
          url: '/api/completion',
          then: (data) =>
            data.data.map((row: Completion) =>
              studentColumns.map((col) => {
                if (col.id === 'action') {
                  return row.unitid;
                }

                return row[col.id as keyof Completion] ?? '-';
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

export default CompletionPage;