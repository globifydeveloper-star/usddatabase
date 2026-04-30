'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Grid } from 'gridjs-react';
import { studentColumns } from './config/net-price-public-income-column-config';
import { NetPricePublicIncome } from '@/types/netPricePublicIncome';
import { useEffect, useState } from 'react';
import EditNetPricePublicIncomeModal from './components/EditNetPricePublicIncomeModal';
import Swal from 'sweetalert2';

const NetPricePublicIncomePage = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [selectedRow, setSelectedRow] = useState<NetPricePublicIncome | null>(null);
    const [gridKey, setGridKey] = useState(0);
 /* ---------- EDIT ---------- */
    useEffect(() => {
        const handleEdit = (event: Event) => {
            const customEvent = event as CustomEvent<NetPricePublicIncome>;
            setSelectedRow(customEvent.detail);
            setShowEdit(true);
        };

        window.addEventListener('openEditNetPricePublicIncomeModal', handleEdit);

        return () => {
            window.removeEventListener('openEditNetPricePublicIncomeModal', handleEdit);
        };
    }, []);

    useEffect(() => {
        const handleDelete = async (event: any) => {
            const row = event.detail;

            const result = await Swal.fire({
                html: `Delete net price public income record for <b><i>${row.unitid}</i></b>?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Yes, delete it!',
            });

            if (!result.isConfirmed) return;

            try {
                const res = await fetch(`/api/net-price-public-income/${row.unitid}`, {
                    method: 'DELETE',
                });

                if (!res.ok) throw new Error('Delete failed');

                await Swal.fire({
                    title: 'Deleted!',
                    text: 'Net price public income record deleted.',
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

        window.addEventListener('deleteNetPricePublicIncome', handleDelete);

        return () => {
            window.removeEventListener('deleteNetPricePublicIncome', handleDelete);
        };
    }, []);

    return (
        <>
            <ComponentContainerCard title="Net Price Public Income List">
                <div className="grid-toolbar">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setSelectedRow(null);
                            setShowEdit(true);
                        }}
                    >
                        Add New Net Price Public Income Data
                    </button>
                </div>

                <Grid
                    key={gridKey}
                    columns={studentColumns}
                    server={{
                        url: '/api/net-price-public-income',
                        then: (data) =>
                            data.data.map((row: NetPricePublicIncome) =>
                                studentColumns.map((col) => {
                                    if (col.id === 'action') {
                                        return row;
                                    }
                                    return row[col.id as keyof NetPricePublicIncome];
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

            <EditNetPricePublicIncomeModal
                show={showEdit}
                onClose={() => setShowEdit(false)}
                data={selectedRow}
                onSuccess={() => setGridKey((prev) => prev + 1)}
            />
        </>
    );
};

export default NetPricePublicIncomePage;
