'use client';

import { html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const userColumns = [
     { id: 'id', name: 'ID', sort: true },
  { id: 'full_name', name: 'Full Name', sort: true },
  { id: 'email', name: 'Email', sort: true },
  { id: 'role_id', name: 'Role', sort: true },
  { id: 'is_active', name: 'Status', sort: true },
  { id: 'last_login', name: 'Last Login', sort: true },
  { id: 'created_at', name: 'Created At', sort: true },
{
  id: "action",
  name: "Action",
  sort: false,
  width: "80px",
  formatter: (cell: string) => {
    if (!cell) return "-";

    return html(`
      <div style="display:flex; gap:8px; justify-content:center;">
        <a href="/users/edit/${cell}" class="text-reset fs-16 px-1" title="Edit">
          <span class="iconify" data-icon="tabler:pencil"></span>
        </a>
        <a href="/users/delete/${cell}" class="text-reset fs-16 px-1" title="Delete">
          <span class="iconify" data-icon="tabler:trash"></span>
        </a>
      </div>
    `);
  },
}  
];
