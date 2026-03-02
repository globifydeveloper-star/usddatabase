'use client';

import { html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const repaymentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '80px' },
    { id: 'yr1_completers', name: '1-YR Completers', sort: true, width: '150px' },
    { id: 'yr1_noncompleters', name: '1-YR Non-Completers', sort: true, width: '150px' },
    { id: 'yr1_overall', name: '1-YR Overall', sort: true, width: '150px' },
    { id: 'yr3_completers', name: '3-YR Completers', sort: true, width: '150px' },
    { id: 'yr3_noncompleters', name: '3-YR Non-Completers', sort: true, width: '150px' },
    { id: 'yr3_overall', name: '3-YR Overall', sort: true, width: '120px' },
{
  id: "action",
  name: "Action",
  sort: false,
  width: "80px",
  formatter: (cell: string) => {
    if (!cell) return "-";

    return html(`
      <div style="display:flex; gap:8px; justify-content:center;">
        <a href="/repayment/edit/${cell}" class="text-reset fs-16 px-1" title="Edit">
          <span class="iconify" data-icon="tabler:pencil"></span>
        </a>
        <a href="/repayment/delete/${cell}" class="text-reset fs-16 px-1" title="Delete">
          <span class="iconify" data-icon="tabler:trash"></span>
        </a>
      </div>
    `);
  },
}  
];
