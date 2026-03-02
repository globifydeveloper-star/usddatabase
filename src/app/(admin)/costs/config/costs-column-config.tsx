'use client';

import { html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '80px' },
    { id: 'booksupply', name: 'Book Supply', sort: true, width: '80px' },
    { id: 'tuition_in_state', name: 'In state Tuition Fees', sort: true, width: '80px' },
    { id: 'tuition_out_state', name: 'Out state Tuition Fees', sort: true, width: '80px'},
    { id: 'tuition_program_year', name: 'Program Year of Tuition', sort: true, width: '80px' },
    { id: 'tuition_out_state', name: 'Out state Tuition Fees', sort: true, width: '80px'},
    { id: 'roomboard_oncampus', name: 'RoomBoard OnCampus', sort: true, width: '80px' },
    { id: 'roomboard_offcampus', name: 'RoomBoard OffCampus', sort: true, width: '80px' },
    { id: 'avg_net_price_public', name: 'Avg Net price Public', sort: true, width: '80px'},
    { id: 'avg_net_price_private', name: 'Avg net price private', sort: true, width: '80px' },
    { id: 'avg_net_price_overall', name: 'Overall Avg net Price', sort: true, width: '80px' },
    { id: 'otherexpense_oncampus', name: 'Other Expense OnCampus', sort: true, width: '80px'},
    { id: 'otherexpense_offcampus', name: 'Other Expense OffCampus', sort: true, width: '80px' },
    { id: 'otherexpense_withfamily', name: 'Other Expense With family', sort: true, width: '80px' },


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
