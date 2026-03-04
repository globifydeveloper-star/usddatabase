'use client';

import { h, html } from 'gridjs';
import { Icon } from '@iconify/react';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const userColumns = [
    { id: 'id', name: 'ID', sort: true },
    { id: 'full_name', name: 'Full Name', sort: true },
    { id: 'email', name: 'Email', sort: true, width: '80px' },
    { id: 'role_name', name: 'Role', sort: true },
    { id: 'is_active', name: 'Status', sort: true },
    { id: 'last_login', name: 'Last Login', sort: true },
    { id: 'created_at', name: 'Created At', sort: true },
    {
        id: 'action',
        name: 'Action',
        sort: false,
        width: '100px',
        formatter: (cell: any) => {
            const rowData = cell; // ✅ full row object

            return h(
                'div',
                {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '14px',
                    },
                },
                [
                    h('svg', {
                        width: '20',
                        height: '20',
                        style: { cursor: 'pointer' },
                        onClick: () =>
                            window.dispatchEvent(
                                new CustomEvent('openEditModal', { detail: rowData })
                            ),
                        children: [
                            h('path', { d: 'M12 20h9' }),
                            h('path', {
                                d: 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z',
                            }),
                        ],
                    }),
                    h('svg', {
                        width: '20',
                        height: '20',
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        stroke: '#ef4444',
                        strokeWidth: '2',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        style: { cursor: 'pointer' },
                        onClick: () =>
                            window.dispatchEvent(
                                new CustomEvent('deleteUser', { detail: rowData })
                            ),
                        children: [
                            h('path', { d: 'M3 6h18' }),
                            h('path', { d: 'M8 6V4h8v2' }),
                            h('path', { d: 'M19 6l-1 14H6L5 6' }),
                            h('path', { d: 'M10 11v6' }),
                            h('path', { d: 'M14 11v6' }),
                        ],
                    }),
                ]
            );
        },
    },
];
