'use client';

import { html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const programColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '80px' },
    { id: 'cip_code', name: 'CIP Code', sort: true, width: '80px' },
    { id: 'title', name: 'Program Title', sort: true, width: '150px' },
    { id: 'credential_level', name: 'Credential Level', sort: true, width: '100px' },
    { id: 'credential_title', name: 'Credential Title', sort: true, width: '120px' },
    { id: 'school_name', name: 'School Name', sort: true, width: '250px' },
    { id: 'school_type', name: 'School Type', sort: true, width: '120px' },
{
  id: "action",
  name: "Action",
  sort: false,
  width: "80px",
  formatter: (cell: string) => {
    if (!cell) return "-";

    return html(`
      <div style="display:flex; gap:8px; justify-content:center;">
        <a href="/programs/edit/${cell}" class="text-reset fs-16 px-1" title="Edit">
          <span class="iconify" data-icon="tabler:pencil"></span>
        </a>
        <a href="/programs/delete/${cell}" class="text-reset fs-16 px-1" title="Delete">
          <span class="iconify" data-icon="tabler:trash"></span>
        </a>
      </div>
    `);
  },
}  
];
