'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/net-price-private-income-column-config';
import { NetPricePrivateIncome } from '@/types/netPricePrivateIncome';
import { useEffect, useState } from 'react';
import EditNetPricePrivateIncomeModal from './components/EditNetPricePrivateIncomeModal';
import Swal from 'sweetalert2';

const NetPricePrivateIncomePage = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [selectedRow, setSelectedRow] = useState<NetPricePrivateIncome | null>(null);
    const [gridKey, setGridKey] = useState(0);

    useEffect(() => {
        const handleEdit = (event: Event) => {
            const customEvent = event as CustomEvent<NetPricePrivateIncome>;
            setSelectedRow(customEvent.detail);
            setShowEdit(true);
        };

        window.addEventListener('openEditNetPricePrivateIncomeModal', handleEdit);

        return () => {
            window.removeEventListener('openEditNetPricePrivateIncomeModal', handleEdit);
        };
    }, []);
    /* ---------- EDIT ---------- */
    useEffect(() => {
        const handleDelete = async (event: any) => {
            const row = event.detail;

            const result = await Swal.fire({
                html: `Delete net price private income record for <b><i>${row.unitid}</i></b>?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Yes, delete it!',
            });

            if (!result.isConfirmed) return;

            try {
                const res = await fetch(`/api/net-price-private-income/${row.unitid}`, {
                    method: 'DELETE',
                });

                if (!res.ok) throw new Error('Delete failed');

                await Swal.fire({
                    title: 'Deleted!',
                    text: 'Net price private income record deleted.',
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

        window.addEventListener('deleteNetPricePrivateIncome', handleDelete);

        return () => {
            window.removeEventListener('deleteNetPricePrivateIncome', handleDelete);
        };
    }, []);

    return (
        <>
            <ComponentContainerCard title="Net Price Private College Income List">
                {/* TOOLBAR */}
                <div className="grid-toolbar">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setSelectedRow(null);
                            setShowEdit(true);
                        }}
                    >
                        Add New Net Price Private Income Data
                    </button>
                </div>

                <Grid
                    key={gridKey}
                    columns={studentColumns}
                    server={{
                        url: '/api/net-price-private-income',
                        then: (data) =>
                            data.data.map((row: NetPricePrivateIncome) =>
                                studentColumns.map((col) => {
                                    if (col.id === 'action') {
                                        return row;
                                    }
                                    return row[col.id as keyof NetPricePrivateIncome];
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

            <EditNetPricePrivateIncomeModal
                show={showEdit}
                onClose={() => setShowEdit(false)}
                data={selectedRow}
                onSuccess={() => setGridKey((prev) => prev + 1)}
            />
        </>
    );
};

export default NetPricePrivateIncomePage;
