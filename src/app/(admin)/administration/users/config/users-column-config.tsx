'use client';

import { h } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const userColumns = [
    { id: 'id', name: 'ID', sort: true, width: '60px' },
    { id: 'full_name', name: 'Full Name', sort: true },
    { id: 'email', name: 'Email', sort: true, width: '140px' },
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
            const rowData = cell;

            const editIcon = h('span', {
                style: {
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#a8e7e7ff',
                },
                onClick: () =>
                    window.dispatchEvent(
                        new CustomEvent('openEditModal', { detail: rowData })
                    ),
                innerHTML:
                    '<iconify-icon icon="ri:edit-line" width="20" height="20"></iconify-icon>',
            });

            const deleteIcon = h('span', {
                style: {
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#ef4444',
                },
                onClick: () =>
                    window.dispatchEvent(
                        new CustomEvent('deleteUser', { detail: rowData })
                    ),
                innerHTML:
                    '<iconify-icon icon="ri:delete-bin-line" width="20" height="20"></iconify-icon>',
            });

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
                [editIcon, deleteIcon]
            );
        },
    },
];