'use client';

import { h } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '120px' },
    { id: 'loan_principal', name: 'Loan Principal', sort: true, width: '80px' },
    { id: 'pell_grant_rate', name: 'Pell Grant Rate', sort: true, width: '80px' },
    { id: 'federal_loan_rate', name: 'Federal loan', sort: true, width: '80px' },
    { id: 'students_with_any_loan', name: 'Students With Any Loan', sort: true, width: '80px' },

    {
        id: 'action',
        name: 'Action',
        sort: false,
        width: '80px',
        formatter: (cell: any) => {
            const rowData = cell; //full row object
            const editIcon = h('span', {
                style: {
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#a8e7e7ff',
                },
                onClick: () =>
                    window.dispatchEvent(new CustomEvent('openEditModal', { detail: rowData })),
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
                    window.dispatchEvent(new CustomEvent('deleteAid', { detail: rowData })),
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
