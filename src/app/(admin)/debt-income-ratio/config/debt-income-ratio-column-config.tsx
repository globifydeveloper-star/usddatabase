'use client';

import { h } from 'gridjs';

export const studentColumns = [
  { id: 'unitid', name: 'Unit ID', sort: true, width: '100px' },
  { id: 'avg_debt', name: 'Avg Debt', sort: true, width: '140px' },
  { id: 'avg_income', name: 'Avg Income', sort: true, width: '140px' },
  { id: 'debt_income_ratio', name: 'Debt Income Ratio', sort: true, width: '170px' },
  { id: 'ratio_text', name: 'Ratio Text', sort: true, width: '200px' },
  {
    id: 'action',
    name: 'Action',
    sort: false,
    width: '100px',
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
          window.dispatchEvent(
            new CustomEvent('openEditDebtIncomeRatioModal', { detail: rowData })
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
            new CustomEvent('deleteDebtIncomeRatio', { detail: rowData })
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
