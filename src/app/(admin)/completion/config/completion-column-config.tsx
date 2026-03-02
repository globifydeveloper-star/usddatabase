'use client';

import { html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '120px' },
    { id: 'completed_2yrs', name: 'Completed 2 Yrs', sort: true, width: '80px' },
    { id: 'completed_3yrs', name: 'Completed 3 Yrs', sort: true, width: '80px' },
    { id: 'completed_4yrs', name: 'Completed 4 Yrs', sort: true, width: '80px' },
    { id: 'completed_6yrs', name: 'Completed 6 Yrs', sort: true, width: '80px' },
   

{
  id: "action",
  name: "Action",
  sort: false,
  width: "120px",
  formatter: (cell: string) => {
    if (!cell) return "-";

    return html(`
      <div style="display:flex; gap:8px; justify-content:center;">
        <a href="completion/edit/${cell}" class="text-reset fs-16 px-1" title="Edit">
          <span class="iconify" data-icon="tabler:pencil"></span>
        </a>
        <a href="completion/delete/${cell}" class="text-reset fs-16 px-1" title="Delete">
          <span class="iconify" data-icon="tabler:trash"></span>
        </a>
      </div>
    `);
  },
}  
];
