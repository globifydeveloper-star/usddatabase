'use client';

import { h, html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const rolesColumns = [
     { id: 'id', name: 'ID', sort: true },
  { id: 'role_name', name: 'Full Name', sort: true },
  {
    id: 'action',
    name: 'Action',
    sort: false,
    width: '110px',
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
            new CustomEvent('deleteRole', { detail: rowData })
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
