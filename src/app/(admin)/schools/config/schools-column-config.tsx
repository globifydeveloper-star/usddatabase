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
];