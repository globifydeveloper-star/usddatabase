'use client';

import { html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '120px' },
    { id: 'loan_principal', name: 'Loan Principal', sort: true, width: '80px' },
    { id: 'pell_grant_rate', name: 'Pell Grant Rate', sort: true, width: '80px' },
    { id: 'federal_loan_rate', name: 'Federal loan', sort: true, width: '80px'},
    { id: 'students_with_any_loan', name: 'Students With Any Loan', sort: true, width: '80px' },
   

{
  id: "action",
  name: "Action",
  sort: false,
  width: "80px",
  formatter: (cell: string) => {
    if (!cell) return "-";

    return html(`
      <div style="display:flex; gap:8px; justify-content:center;">
        <a href="/aid/edit/${cell}" class="text-reset fs-16 px-1" title="Edit">
          <span class="iconify" data-icon="tabler:pencil"></span>
        </a>
        <a href="/aid/delete/${cell}" class="text-reset fs-16 px-1" title="Delete">
          <span class="iconify" data-icon="tabler:trash"></span>
        </a>
      </div>
    `);
  },
}  
];
