'use client';

import { h } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'id', name: 'ID', hidden: true },
    { id: 'unitid', name: 'Unit ID', sort: true, width: '80px' },
    { id: 'ope8_id', name: 'Ope8_id', sort: true, width: '100px' },
    { id: 'school_name', name: 'School Name', sort: true, width: '120px' },
    { id: 'cip_code', name: 'Cip Code', sort: true, width: '100px' },
    { id: 'cip_title', name: 'Cip Title', sort: true, width: '120px' },
    { id: 'grad_cohort', name: 'Grad Cohort', sort: true, width: '120px' },
    { id: 'year_1', name: '1st year', sort: true, width: '120px' },
    { id: 'year_5', name: '5th Year', sort: true, width: '120px' },
    { id: 'year_10', name: '10th Year', sort: true, width: '120px' },
    { id: 'credential_level', name: 'Credential Level', sort: true, width: '120px' },
    { id: 'credential_title', name: 'Credential Title', sort: true, width: '120px' },

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
                    window.dispatchEvent(new CustomEvent('deleteEarningsAgainstCourses', { detail: rowData })),
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
