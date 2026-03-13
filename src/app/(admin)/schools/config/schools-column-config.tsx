'use client';

import { h, html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

export const schoolsColumns = [
  { id: 'unitid', name: 'Unit ID', sort: true, width: '90px'},
  { id: 'name', name: 'Name', sort: true, width: '260px' },
  { id: 'city', name: 'City', sort: true, width: '150px' },
  { id: 'state', name: 'State', sort: true, width: '80px' },
  { id: 'zip', name: 'Zip', sort: true, width: '120px' },
  { id: 'address', name: 'Address', sort: true, width: '220px' },
  { id: 'accreditor', name: 'Accreditor', sort: true, width: '260px' },

  {
    id: 'school_url',
    name: 'Website',
    sort: true,
    width: '200px',
    formatter: (cell: any) => {
      if (!cell) return '-';
      const safeUrl = normalizeUrl(cell);
      return html(
        `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" style="color:#0d6efd; text-decoration:underline;">${cell}</a>`
      );
    },
  },

  { id: 'degrees_awarded', name: 'Degrees', sort: true, width: '120px' },

  {
    id: 'has_pseo',
    name: 'PSEO',
    sort: true,
    width: '80px',
    formatter: (cell: boolean) => (cell ? 'Yes' : 'No'),
  },

  { id: 'ope8_id', name: 'OPE8 ID', sort: true, width: '110px' },

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
            new CustomEvent('deleteSchool', { detail: rowData })
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