'use client';

import { h } from 'gridjs';

export const studentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '100px' },
    { id: 'income_0_30000', name: 'Income 0-30000', sort: true, width: '140px' },
    { id: 'income_0_48000', name: 'Income 0-48000', sort: true, width: '140px' },
    { id: 'income_30001_48000', name: 'Income 30001-48000', sort: true, width: '180px' },
    { id: 'income_30001_75000', name: 'Income 30001-75000', sort: true, width: '180px' },
    { id: 'income_48001_75000', name: 'Income 48001-75000', sort: true, width: '180px' },
    { id: 'income_75001_110000', name: 'Income 75001-110000', sort: true, width: '180px' },
    { id: 'income_75000_plus', name: 'Income 75000+', sort: true, width: '140px' },
    { id: 'income_110001_plus', name: 'Income 110001+', sort: true, width: '150px' },
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
                        new CustomEvent('openEditNetPricePublicIncomeModal', { detail: rowData })
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
                        new CustomEvent('deleteNetPricePublicIncome', { detail: rowData })
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
