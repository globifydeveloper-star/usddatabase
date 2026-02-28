'use client';

import { useEffect, useState } from 'react';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { schoolsColumns } from './config/schools-column-config';

interface School {
    unitid: string;
    name: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    address: string | null;
    accreditor: string | null;
    school_url: string | null;
    degrees_awarded: number | null;
    has_pseo: boolean;
    ope8_id: string | null;
}

const SchoolsPage = () => {
    return (
        <ComponentContainerCard title="Schools List">
            <Grid
                columns={schoolsColumns}
                server={{
                    url: '/api/schools',
                    then: (data) =>
                        data.data.map((row: School) =>
                            schoolsColumns.map((col) => {
                                if (col.id === 'has_pseo') {
                                    return row?.has_pseo ? 'Yes' : 'No';
                                }
                                return row[col.id as keyof School];
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

export default SchoolsPage;
