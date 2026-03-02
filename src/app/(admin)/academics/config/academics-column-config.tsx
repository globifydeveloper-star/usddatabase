'use client';

import { html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '80px' },
    { id: 'assoc', name: 'Assoc', sort: true, width: '80px' },
    { id: 'degree', name: 'Degree', sort: true, width: '80px' },
    { id: 'bachelors', name: 'Bachelors', sort: true, width: '80px' },
    { id: 'certificate_lt_1yr', name: 'Certificate < 1yr', sort: true, width: '80px' },
    { id: 'certificate_lt_2yr', name: 'Certificate < 2yr', sort: true, width: '80px' },
    { id: 'certificate_lt_4yr', name: 'Certificate < 4yr', sort: true, width: '80px' },
    { id: 'degree_or_certificate', name: 'Degree or Certificate', sort: true, width: '80px' },
   

{
  id: "action",
  name: "Action",
  sort: false,
  width: "120px",
  formatter: (cell: string) => {
    if (!cell) return "-";

    return html(`
      <div style="display:flex; gap:8px; justify-content:center;">
        <a href="/academics/edit/${cell}" class="text-reset fs-16 px-1" title="Edit">
          <span class="iconify" data-icon="tabler:pencil"></span>
        </a>
        <a href="/academics/delete/${cell}" class="text-reset fs-16 px-1" title="Delete">
          <span class="iconify" data-icon="tabler:trash"></span>
        </a>
      </div>
    `);
  },
}  
];
