'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/costs-column-config';

interface Costs {
  unitid: number;

  booksupply: number | null;
  tuition_in_state: number | null;
  tuition_out_state: number | null;
  tuition_program_year: number | null;

  roomboard_oncampus: number | null;
  roomboard_offcampus: number | null;

  avg_net_price_public: number | null;
  avg_net_price_private: number | null;
  avg_net_price_overall: number | null;

  otherexpense_oncampus: number | null;
  otherexpense_offcampus: number | null;
  otherexpense_withfamily: number | null;
}

const CostsPage = () => {
  return (
    <ComponentContainerCard title="Costs List">
      <Grid
        columns={studentColumns}
        server={{
          url: '/api/costs',
          then: (data) =>
            data.data.map((row: Costs) =>
              studentColumns.map((col) => {
                if (col.id === 'action') {
                }

                return row[col.id as keyof Costs] ?? '-';
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

export default CostsPage;