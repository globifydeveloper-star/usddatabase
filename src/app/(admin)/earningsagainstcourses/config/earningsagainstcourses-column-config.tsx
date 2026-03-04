'use client';

import { html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '80px' },
    { id: 'ope8_id', name: 'Ope8_id', sort: true, width: '100px' },
    { id: 'school_name', name: 'School Name', sort: true, width: '120px' },
    { id: 'cip_code', name: 'Cip Code', sort: true, width: '80px'},
    { id: 'cip_title', name: 'Cip Title', sort: true, width: '120px'},
    { id: 'grad_cohort', name: 'Grad Cohort', sort: true, width: '80px' },
    { id: 'year_1', name: '1st year', sort: true, width: '80px'},
    { id: 'year_5', name: '5th Year', sort: true, width: '80px' },
    { id: 'year_10', name: '10th Year', sort: true, width: '80px' },
    { id: 'credential_level', name: 'Credential Level', sort: true, width: '120px' },
    { id: 'credential_title', name: 'Credential Title', sort: true, width: '120px'},
   


{
  id: "action",
  name: "Action",
  sort: false,
  width: "80px",
  formatter: (cell: string) => {
    if (!cell) return "-";

    return html(`
      <div style="display:flex; gap:8px; justify-content:center;">
        <a href="/earningsagainstcourses/edit/${cell}" class="text-reset fs-16 px-1" title="Edit">
          <span class="iconify" data-icon="tabler:pencil"></span>
        </a>
        <a href="/earningsagainstcourses/delete/${cell}" class="text-reset fs-16 px-1" title="Delete">
          <span class="iconify" data-icon="tabler:trash"></span>
        </a>
      </div>
    `);
  },
}  
];

