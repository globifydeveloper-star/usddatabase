'use client';

import { html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '120px' },
    { id: 'size', name: 'Size', sort: true, width: '80px' },
    { id: 'grad_students', name: 'Grad Students', sort: true, width: '150px' },
    { id: 'enrollment_grad_12_month', name: 'Grad 12 Month', sort: true, width: '150px' },
    { id: 'undergrad_12_month', name: 'Undergrad 12 Month', sort: true, width: '150px' },
    { id: 'fafsa_applications', name: 'FAFSA Applications', sort: true, width: '150px' },
    { id: 'demographics_men', name: 'Demographics Men', sort: true, width: '170px' },
    { id: 'demographics_women', name: 'Demographics Women', sort: true, width: '170px' },
    { id: 'faculty_men', name: 'Faculty Men', sort: true, width: '120px' },
    { id: 'faculty_women', name: 'Faculty Women', sort: true, width: '120px' },

{
  id: "action",
  name: "Action",
  sort: false,
  width: "120px",
  formatter: (cell: string) => {
    if (!cell) return "-";

    return html(`
      <div style="display:flex; gap:8px; justify-content:center;">
        <a href="/students/edit/${cell}" class="text-reset fs-16 px-1" title="Edit">
          <span class="iconify" data-icon="tabler:pencil"></span>
        </a>
        <a href="/students/delete/${cell}" class="text-reset fs-16 px-1" title="Delete">
          <span class="iconify" data-icon="tabler:trash"></span>
        </a>
      </div>
    `);
  },
}  
];
