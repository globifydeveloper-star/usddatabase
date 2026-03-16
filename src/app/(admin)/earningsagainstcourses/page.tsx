'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';

import { studentColumns } from './config/earningsagainstcourses-column-config';
import { EarningsAgainstCourses } from '@/types/EarningsAgainstCourses';
import EditearningsagainstModal from './components/EditearningsagainstModal';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const EarningsagainstcoursesPage = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [selectedRow, setSelectedRow] = useState<EarningsAgainstCourses | null>(null);
    const [gridKey, setGridKey] = useState(0);

    /* ---------- EDIT ---------- */
    useEffect(() => {
        const handleEdit = (event: Event) => {
            const customEvent = event as CustomEvent<EarningsAgainstCourses>;
            setSelectedRow(customEvent.detail);
            setShowEdit(true);
        };

        window.addEventListener('openEditModal', handleEdit);

        return () => {
            window.removeEventListener('openEditModal', handleEdit);
        };
    }, []);

    /* ---------- DELETE ---------- */
    useEffect(() => {
        const handleDeleteEarningsAgainstCourses = async (event: any) => {
            const earningsAgainstCourses = event.detail;

            const result = await Swal.fire({
                html: `Delete earnings against courses record for <b><i>${earningsAgainstCourses.unitid}</i></b>?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Yes, delete it!',
            });

            if (!result.isConfirmed) return;

            try {
                const res = await fetch(`/api/earningsagainstcourses/${earningsAgainstCourses.unitid}`, {
                    method: 'DELETE',
                });

                if (!res.ok) throw new Error('Delete failed');

                await Swal.fire({
                    title: 'Deleted!',
                    text: 'Earnings against courses record deleted.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });

                setGridKey((prev) => prev + 1);
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Something went wrong',
                    icon: 'error',
                });
            }
        };

        window.addEventListener('deleteEarningsAgainstCourses', handleDeleteEarningsAgainstCourses);

        return () => {
            window.removeEventListener('deleteEarningsAgainstCourses', handleDeleteEarningsAgainstCourses);
        };
    }, []);

    return (
        <>
            <ComponentContainerCard title="Earnings Against Courses List">
                {/* TOOLBAR */}
                <div className="grid-toolbar">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setSelectedRow(null);
                            setShowEdit(true);
                        }}
                    >
                        Add New Earnings Data
                    </button>
                </div>
                <Grid
                    key={gridKey}
                    columns={studentColumns}
                    server={{
                        url: '/api/earningsagainstcourses',
                        then: (data) =>
                            data.data.map((row: EarningsAgainstCourses) =>
                                studentColumns.map((col) => {
                                    if (col.id === 'action') {
                                        return row;
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
            <EditearningsagainstModal
                show={showEdit}
                onClose={() => setShowEdit(false)}
                data={selectedRow}
                onSuccess={() => setGridKey((prev) => prev + 1)}
            />
        </>
    );
};

export default EarningsagainstcoursesPage;
