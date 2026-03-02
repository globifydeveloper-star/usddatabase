'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { repaymentColumns } from './config/repayment-column-config';
interface Repayment {
  id: number;
  unitid: string;
  yr1_completers: string | null;
  yr1_noncompleters: string | null;
  yr1_overall: string | null;
  yr3_completers: string | null;
  yr3_noncompleters: string | null;
  yr3_overall: string | null;
}

const RepaymentPage = () => {
  return (
    <ComponentContainerCard title="Repayment List">
      <Grid
        columns={repaymentColumns}
        server={{
          url: '/api/repayment',
          then: (data) =>
            data.data.map((row: Repayment) =>
              repaymentColumns.map((col) => {
                if (col.id === 'action') {
                  return row.unitid; 
                }

                return row[col.id as keyof Repayment] ?? '-';
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

export default RepaymentPage;