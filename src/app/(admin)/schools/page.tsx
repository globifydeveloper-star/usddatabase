'use client';

import { useEffect, useState } from 'react';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { schoolsColumns } from './config/schools-column-config';
import EditSchoolModal from './components/EditSchoolModal';

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
const [showEdit, setShowEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState<School | null>(null);
  const [gridKey, setGridKey] = useState(0);
  useEffect(() => {
    const handleEdit = (event: Event) => {
      const customEvent = event as CustomEvent<School>;
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
        <ComponentContainerCard title="Schools List">
            <Grid
            key={gridKey}
                columns={schoolsColumns}
                server={{
                    url: '/api/schools',
                    then: (data) =>
                        data.data.map((row: School) =>
                            schoolsColumns.map((col) => {
                                switch (col.id) {
                                    case 'has_pseo':
                                        return row.has_pseo ? 'Yes' : 'No';
                                    case 'action':
                                        // feed the unitid into the Action column
                                        return row;
                                    default:
                                        return row[col.id as keyof School];
                                }
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
        <EditSchoolModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        data={selectedRow}
        onSuccess={() => setGridKey((prev) => prev + 1)}
      />
    </>
    );
};

export default SchoolsPage;
