'use client';

import { html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '120px' },
    { id: 'test_requirements', name: 'Test Requirements', sort: true, width: '80px' },
    { id: 'admission_rate', name: 'Admission Rate', sort: true, width: '80px' },
   

{
  id: "action",
  name: "Action",
  sort: false,
  width: "120px",
  formatter: (cell: string) => {
    if (!cell) return "-";

    return html(`
      <div style="display:flex; gap:8px; justify-content:center;">
        <a href="/admissions/edit/${cell}" class="text-reset fs-16 px-1" title="Edit">
          <span class="iconify" data-icon="tabler:pencil"></span>
        </a>
        <a href="/admissions/delete/${cell}" class="text-reset fs-16 px-1" title="Delete">
          <span class="iconify" data-icon="tabler:trash"></span>
        </a>
      </div>
    `);
  },
}  
];
