'use client';

import { h } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '80px' },
    { id: 'booksupply', name: 'Book Supply', sort: true, width: '120px' },
    { id: 'tuition_in_state', name: 'In state Tuition Fees', sort: true, width: '150px' },
    { id: 'tuition_out_state', name: 'Out state Tuition Fees', sort: true, width: '150px' },
    { id: 'tuition_program_year', name: 'Program Year of Tuition', sort: true, width: '120px' },
    { id: 'tuition_out_state', name: 'Out state Tuition Fees', sort: true, width: '150px' },
    { id: 'roomboard_oncampus', name: 'RoomBoard OnCampus', sort: true, width: '180px' },
    { id: 'roomboard_offcampus', name: 'RoomBoard OffCampus', sort: true, width: '180px' },
    { id: 'avg_net_price_public', name: 'Avg Net price Public', sort: true, width: '180px' },
    { id: 'avg_net_price_private', name: 'Avg net price private', sort: true, width: '180px' },
    { id: 'avg_net_price_overall', name: 'Overall Avg net Price', sort: true, width: '180px' },
    { id: 'otherexpense_oncampus', name: 'Other Expense OnCampus', sort: true, width: '180px' },
    { id: 'otherexpense_offcampus', name: 'Other Expense OffCampus', sort: true, width: '180px' },
    {
        id: 'otherexpense_withfamily',
        name: 'Other Expense With family',
        sort: true,
        width: '180px',
    },
    { id: 'for_roi_data', name: 'For ROI Data', sort: true, width: '120px' },

    {
        id: 'action',
        name: 'Action',
        sort: false,
        width: '80px',
        formatter: (cell: any) => {
            const rowData = cell; // full row object

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
                    window.dispatchEvent(new CustomEvent('deleteCost', { detail: rowData })),
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
