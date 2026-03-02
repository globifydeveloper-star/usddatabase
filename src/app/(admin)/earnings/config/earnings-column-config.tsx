'use client';

import { html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '80px' },
    { id: 'median_1yr', name: '1-YR Median', sort: true, width: '80px' },
    { id: 'median_3yr', name: '3-YR Median', sort: true, width: '80px' },
    { id: 'median_4yr', name: '4-YR Median', sort: true, width: '80px'},
    { id: 'median_5yr', name: '5-YR Median', sort: true, width: '80px' },
    { id: 'students_count', name: 'Students Count', sort: true, width: '80px'},
   


{
  id: "action",
  name: "Action",
  sort: false,
  width: "80px",
  formatter: (cell: string) => {
    if (!cell) return "-";

    return html(`
      <div style="display:flex; gap:8px; justify-content:center;">
        <a href="/costs/edit/${cell}" class="text-reset fs-16 px-1" title="Edit">
          <span class="iconify" data-icon="tabler:pencil"></span>
        </a>
        <a href="/costs/delete/${cell}" class="text-reset fs-16 px-1" title="Delete">
          <span class="iconify" data-icon="tabler:trash"></span>
        </a>
      </div>
    `);
  },
}  
];

