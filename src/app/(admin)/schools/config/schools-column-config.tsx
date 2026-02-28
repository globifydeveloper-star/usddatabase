'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const schoolsColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '120px' },
    { id: 'name', name: 'Name', sort: true, width: '250px' },
    { id: 'city', name: 'City', sort: true, width: '150px' },
    { id: 'state', name: 'State', sort: true, width: '100px' },
    { id: 'zip', name: 'Zip', sort: true, width: '120px' },
    { id: 'address', name: 'Address', sort: true, width: '300px' },
    { id: 'accreditor', name: 'Accreditor', sort: true, width: '300px' },
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
    { id: 'has_pseo', name: 'PSEO', sort: true, width: '100px' },
    { id: 'ope8_id', name: 'OPE8 ID', sort: true, width: '140px' },
{
  id: "action",
  name: "Action",
  sort: false,
  width: "120px",
  formatter: (cell: string) => {
    if (!cell) return "-";

    return html(`
      <div style="display:flex; gap:8px; justify-content:center;">
        <a href="/schools/edit/${cell}" class="text-reset fs-16 px-1" title="Edit">
          <span class="iconify" data-icon="tabler:pencil"></span>
        </a>
        <a href="/schools/delete/${cell}" class="text-reset fs-16 px-1" title="Delete">
          <span class="iconify" data-icon="tabler:trash"></span>
        </a>
      </div>
    `);
  },
}  
];
