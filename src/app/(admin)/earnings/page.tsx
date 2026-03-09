'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/earnings-column-config';
import { Earnings } from '@/types/earnings';
import { useEffect, useState } from 'react';
import EditEarningsModal from './components/EditEarningsModal';
import { Repayment } from '@/types/repayment';

const EarningsPage = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [selectedRow, setSelectedRow] = useState<Earnings | null>(null);
    const [gridKey, setGridKey] = useState(0);

    useEffect(() => {
        const handleEdit = (event: Event) => {
            const customEvent = event as CustomEvent<Earnings>;
            setSelectedRow(customEvent.detail);
            setShowEdit(true);
        };

        window.addEventListener('openEditModal', handleEdit);

        return () => {
            window.removeEventListener('openEditModal', handleEdit);
        };
    }, []);
    return (
        <>
        <ComponentContainerCard title="Earnings List">
            <Grid
                key={gridKey}
                columns={studentColumns}
                server={{
                    url: '/api/earnings',
                    then: (data) =>
                                 data.data.map((row: Repayment) =>
                                   studentColumns.map((col) => {
                                     if (col.id === 'action') {
                                       return row;
                                     } else {
                                       return row[col.id as keyof Repayment];
                                     }
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
          <EditEarningsModal
                show={showEdit}
                onClose={() => setShowEdit(false)}
                data={selectedRow}
                onSuccess={() => setGridKey((prev) => prev + 1)}
              />
            </>
    );
};

export default EarningsPage;
