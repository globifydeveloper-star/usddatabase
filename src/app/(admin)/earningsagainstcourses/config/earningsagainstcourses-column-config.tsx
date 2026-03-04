'use client';

import { h, html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
  { id: 'id', name: 'ID', hidden: true },
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
  formatter: (cell: any) => {
 const rowData = cell

  return h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "14px",
      },
    },
    [
      h("svg", {
        width: "20",
        height: "20",
        style: { cursor: "pointer" },
        onClick: () =>
          window.dispatchEvent(
            new CustomEvent("openEditModal", { detail: rowData })
          ),
        children: [
          h("path", { d: "M12 20h9" }),
          h("path", {
            d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z",
          }),
        ],
      }),
    ]
  );
}
 }  
 ];
 

