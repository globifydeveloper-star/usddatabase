'use client';

import React, { useEffect } from 'react';
import { Grid } from 'gridjs-react';
import { h } from 'gridjs';
import { useCrudGrid, CrudConfig } from '@/hooks/useCrudGrid';
import ComponentContainerCard from './ComponentContainerCard';

interface CrudGridPageProps<T> {
    config: CrudConfig<T>;
}

export function CrudGridPage<T extends { id: any }>({ config }: CrudGridPageProps<T>) {
    const showAddButton = config.showAddButton ?? true;
    const showActions   = config.showActions   ?? true;

    const {
        modalOpen,
        selectedItem,
        key,
        handleEdit,
        handleDelete,
        handleSave,
        setModalOpen,
        setSelectedItem,
    } = useCrudGrid(config as any);

    useEffect(() => {
        if (!showActions) return; // skip listeners entirely for read-only pages

        const onEdit   = (e: Event) => handleEdit((e as CustomEvent).detail);
        const onDelete = (e: Event) => handleDelete((e as CustomEvent).detail);

        window.addEventListener('gridEdit', onEdit);
        window.addEventListener('gridDelete', onDelete);

        return () => {
            window.removeEventListener('gridEdit', onEdit);
            window.removeEventListener('gridDelete', onDelete);
        };
    }, [showActions, handleEdit, handleDelete]);

    const actionColumn = {
        name: 'Actions',
        id: 'action',
        sort: false,
        width: '100px',
        formatter: (cell: any) => {
            const rowData = cell;

            return h(
                'div',
                {
                    style: {
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                },
                [
                    // Edit icon
                    h('svg', {
                        xmlns: 'http://www.w3.org/2000/svg',
                        width: '18', height: '18',
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        stroke: '#3b82f6',
                        strokeWidth: '2',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        style: { cursor: 'pointer' },
                        onClick: () =>
                            window.dispatchEvent(new CustomEvent('gridEdit', { detail: rowData })),
                    }, [
                        h('path', { d: 'M12 20h9' }),
                        h('path', { d: 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z' }),
                    ]),

                    // Delete icon
                    h('svg', {
                        xmlns: 'http://www.w3.org/2000/svg',
                        width: '18', height: '18',
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        stroke: '#ef4444',
                        strokeWidth: '2',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        style: { cursor: 'pointer' },
                        onClick: () =>
                            window.dispatchEvent(new CustomEvent('gridDelete', { detail: rowData })),
                    }, [
                        h('polyline', { points: '3 6 5 6 21 6' }),
                        h('path', { d: 'M19 6l-1 14H6L5 6' }),
                        h('path', { d: 'M10 11v6' }),
                        h('path', { d: 'M14 11v6' }),
                        h('path', { d: 'M9 6V4h6v2' }),
                    ]),
                ]
            );
        },
    };

    const columns = [
        ...config.columns.map((col) => ({
            name: col.name,
            id: col.id as string,
            sort: col.sort ?? true,
            width: col.width,
        })),
        ...(showActions ? [actionColumn] : []),  // ← conditionally append
    ];

    return (
        <div key={key}>
            <ComponentContainerCard title={config.labels.title}>

                {/* Toolbar — only rendered when showAddButton is true */}
                {showAddButton && (
                    <div className="grid-toolbar">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setSelectedItem(null);
                                setModalOpen(true);
                            }}
                        >
                            Add New {config.labels.title}
                        </button>
                    </div>
                )}

                <Grid
                    columns={columns}
                    server={{
                        url: config.apiEndpoint,
                        then: (data: any) =>
                            data.data.map((row: T) => [
                                ...config.columns.map((col) => {
                                    const value = row[col.id];
                                    if (value === null || value === undefined) return '-';
                                    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
                                    return value;
                                }),
                                // only append serialised row when actions are shown
                                ...(showActions ? [JSON.parse(JSON.stringify(row))] : []),
                            ]),
                        total: (data: any) => data.total,
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

            {/* Modal — only mounted when actions are enabled */}
            {showActions && (
                <config.modalComponent
                    show={modalOpen}
                    onClose={() => setModalOpen(false)}
                    data={selectedItem as any}
                    onSuccess={handleSave}
                />
            )}
        </div>
    );
}