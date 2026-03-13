'use client';

import { useEffect, useState } from 'react';
import ComponentContainerCard from '@/components/ComponentContainerCard';

import { Grid } from 'gridjs-react';
import { programColumns } from './config/program-column-config';

import EditProgramModal from './components/EditProgramsModal';
import { Program } from '@/types/programs';
import Swal from 'sweetalert2';

const ProgramsPage = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [selectedRow, setSelectedRow] = useState<Program | null>(null);
    const [gridKey, setGridKey] = useState(0);

    // Open Edit Modal
    useEffect(() => {
        const handleEdit = (event: Event) => {
            const customEvent = event as CustomEvent<Program>;
            setSelectedRow(customEvent.detail);
            setShowEdit(true);
        };

        window.addEventListener('openEditModal', handleEdit);

        return () => {
            window.removeEventListener('openEditModal', handleEdit);
        };
    }, []);

    // Delete Program
    useEffect(() => {
        const handleDeleteProgram = async (event: any) => {
            const program = event.detail;

            const result = await Swal.fire({
                title: 'Delete Program',
                html: `
Delete program -> <b><i>${program.title}</i></b><br/>
<span style="font-size:13px;color:#9ca3af">
(ID: <i>${program.id}</i>)
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
                const res = await fetch(`/api/programs/${program.id}`, {
                    method: 'DELETE',
                });

                if (!res.ok) throw new Error('Delete failed');

                await Swal.fire({
                    title: 'Deleted!',
                    text: 'Program has been deleted.',
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

        window.addEventListener('deleteProgram', handleDeleteProgram);

        return () => {
            window.removeEventListener('deleteProgram', handleDeleteProgram);
        };
    }, []);

    return (
        <>
            <ComponentContainerCard title="Programs List">
                <div className="grid-toolbar">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setSelectedRow(null);
                            setShowEdit(true);
                        }}
                    >
                        Add New Program
                    </button>
                </div>

                <Grid
                    key={gridKey}
                    columns={programColumns}
                    server={{
                        url: '/api/programs',

                        then: (data) =>
                            data.data.map((row: Program) =>
                                programColumns.map((col) => {
                                    switch (col.id) {
                                        case 'action':
                                            return row;
                                        default:
                                            return row[col.id as keyof Program];
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

            <EditProgramModal
                show={showEdit}
                onClose={() => setShowEdit(false)}
                data={selectedRow}
                onSuccess={() => setGridKey((prev) => prev + 1)}
            />
        </>
    );
};

export default ProgramsPage;
