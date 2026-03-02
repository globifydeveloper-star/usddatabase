'use client';

import { html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const permissionsColumns = [
     { id: 'id', name: 'ID', sort: true },
  { id: 'user_id', name: 'User Id', sort: true },
  { id: 'table_name', name: 'Table Name', sort: true },
  { id: 'can_read', name: 'Read', sort: true },
  { id: 'can_edit', name: 'Edit', sort: true },
  { id: 'can_delete', name: 'Delete', sort: true },
{
  id: "action",
  name: "Action",
  sort: false,
  width: "80px",
  formatter: (cell: string) => {
    if (!cell) return "-";

    return html(`
      <div style="display:flex; gap:8px; justify-content:center;">
        <a href="/permissions/edit/${cell}" class="text-reset fs-16 px-1" title="Edit">
          <span class="iconify" data-icon="tabler:pencil"></span>
        </a>
        <a href="/permissions/delete/${cell}" class="text-reset fs-16 px-1" title="Delete">
          <span class="iconify" data-icon="tabler:trash"></span>
        </a>
      </div>
    `);
  },
}  
];
