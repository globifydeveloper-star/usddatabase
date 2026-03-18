'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/academics-column-config';
import EditAcademicsModal from './components/EditAcademicsModal';

import { useEffect, useState } from 'react';
import { Academics } from '@/types/academics';
import Swal from 'sweetalert2';

const AcademicsPage = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [selectedRow, setSelectedRow] = useState<Academics | null>(null);
    const [gridKey, setGridKey] = useState(0);
    /* ---------- EDIT ---------- */
    useEffect(() => {
        const handleEdit = (event: Event) => {
            const customEvent = event as CustomEvent<Academics>;
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
        const handleDeleteAcademics = async (event: any) => {
            const academics = event.detail;

            const result = await Swal.fire({
                html: `Delete Academics record for <b><i>${academics.unitid}</i></b>?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Yes, delete it!',
            });

            if (!result.isConfirmed) return;

            try {
                const res = await fetch(`/api/academics/${academics.unitid}`, {
                    method: 'DELETE',
                });

                if (!res.ok) throw new Error('Delete failed');

                await Swal.fire({
                    title: 'Deleted!',
                    text: 'Academics record deleted.',
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

        window.addEventListener('deleteAcademics', handleDeleteAcademics);

        return () => {
            window.removeEventListener('deleteAcademics', handleDeleteAcademics);
        };
    }, []);
    return (
        <>
            <ComponentContainerCard title="Academics List">
                {/* TOOLBAR */}
                <div className="grid-toolbar">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setSelectedRow(null);
                            setShowEdit(true);
                        }}
                    >
                        Add New Academics Data
                    </button>
                </div>
                <Grid
                    key={gridKey}
                    columns={studentColumns}
                    server={{
                        url: '/api/academics',
                        then: (data) =>
                            data.data.map((row: Academics) =>
                                studentColumns.map((col: { id: string }) => {
                                    if (col.id === 'action') {
                                        return row;
                                    }

                                    const value = row[col.id as keyof Academics];

                                    if (value === null || value === undefined) {
                                        return '-';
                                    }

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
            <EditAcademicsModal
                show={showEdit}
                onClose={() => setShowEdit(false)}
                data={selectedRow}
                onSuccess={() => setGridKey((prev) => prev + 1)}
            />
        </>
    );
};

export default AcademicsPage;
