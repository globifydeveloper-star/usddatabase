'use client';

import { h } from 'gridjs';

export const programColumns = [
  { id: 'unitid', name: 'Unit ID', sort: true, width: '90px' },
  { id: 'cip_code', name: 'CIP Code', sort: true, width: '100px' },
  { id: 'title', name: 'Program Title', sort: true, width: '260px' },
  { id: 'credential_level', name: 'Credential Level', sort: true, width: '150px' },
  { id: 'credential_title', name: 'Credential Title', sort: true, width: '200px' },
  { id: 'school_name', name: 'School Name', sort: true, width: '260px' },
  { id: 'school_type', name: 'School Type', sort: true, width: '150px' },

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
            new CustomEvent('deleteProgram', { detail: rowData })
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