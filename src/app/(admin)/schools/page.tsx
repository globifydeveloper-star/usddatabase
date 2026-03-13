'use client';

import { useEffect, useState } from 'react';
import ComponentContainerCard from '@/components/ComponentContainerCard';

import { Grid } from 'gridjs-react';
import { schoolsColumns } from './config/schools-column-config';

import EditSchoolModal from './components/EditSchoolModal';
import { School } from '@/types/schools';
import Swal from 'sweetalert2';

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
    useEffect(() => {
        const handleDeleteSchools = async (event: any) => {
            const school = event.detail;

            const result = await Swal.fire({
                title: 'Delete school',
                html: `
Delete school -> <b><i>${school.name}</i></b><br/>
<span style="font-size:13px;color:#9ca3af">
(ID: <i>${school.unitid}</i>)
</span>
`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Yes, delete it!',
            });

            if (!result.isConfirmed) return;

            try {
                const res = await fetch(`/api/schools/${school.unitid}`, {
                    method: 'DELETE',
                });

                if (!res.ok) throw new Error('Delete failed');

                await Swal.fire({
                    title: 'Deleted!',
                    text: 'School has been deleted.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });

                setGridKey((prev) => prev + 1); // refresh grid
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Something went wrong',
                    icon: 'error',
                });
            }
        };

        window.addEventListener('deleteSchool', handleDeleteSchools);

        return () => {
            window.removeEventListener('deleteSchool', handleDeleteSchools);
        };
    }, []);

    return (
        <>
            <ComponentContainerCard title="Schools List">
                <div className="grid-toolbar">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setSelectedRow(null);
                            setShowEdit(true);
                        }}
                    >
                        Add New School
                    </button>
                </div>
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
