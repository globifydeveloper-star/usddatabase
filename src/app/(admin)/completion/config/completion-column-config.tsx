'use client';

import { h } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '120px' },
    { id: 'completed_2yrs', name: 'Completed 2 Yrs', sort: true, width: '80px' },
    { id: 'completed_3yrs', name: 'Completed 3 Yrs', sort: true, width: '80px' },
    { id: 'completed_4yrs', name: 'Completed 4 Yrs', sort: true, width: '80px' },
    { id: 'completed_6yrs', name: 'Completed 6 Yrs', sort: true, width: '80px' },
    { id: 'emp_factor', name: 'Emp Factor', sort: true, width: '80px' },
    { id: 'completion_rate', name: 'Completion Rate', sort: true, width: '120px' },


    {
        id: 'action',
        name: 'Action',
        sort: false,
        width: '120px',
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
            new CustomEvent('deleteCompletion', { detail: rowData })
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
