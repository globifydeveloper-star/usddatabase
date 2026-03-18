'use client';

import { h ,  html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '80px' },
    { id: 'assoc', name: 'Assoc', sort: true, width: '80px' },
    { id: 'degree', name: 'Degree', sort: true, width: '100px' },
    { id: 'bachelors', name: 'Bachelors', sort: true, width: '100px' },
    { id: 'certificate_lt_1yr', name: 'Certificate < 1yr', sort: true, width: '140px' },
    { id: 'certificate_lt_2yr', name: 'Certificate < 2yr', sort: true, width: '140px' },
    { id: 'certificate_lt_4yr', name: 'Certificate < 4yr', sort: true, width: '140px' },
    { id: 'degree_or_certificate', name: 'Degree or Certificate', sort: true, width: '140px' },
   

{
  id: "action",
  name: "Action",
  sort: false,
  width: "120px",
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
            new CustomEvent('deleteAcademics', { detail: rowData })
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
