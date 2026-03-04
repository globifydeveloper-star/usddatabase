'use client';

import { h, html } from 'gridjs';

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
  formatter: (_: any, row: any) => {
  const rowData = {
    id: row.cells[0].data,
    unitid: row.cells[0].data,
    ope8_id: row.cells[1].data,
    school_name: row.cells[2].data,
    cip_code: row.cells[3].data,
    cip_title: row.cells[4].data,
    grad_cohort: row.cells[5].data,
    year_1: row.cells[6].data,
    year_5: row.cells[7].data,
    year_10: row.cells[8].data,
    credential_level: row.cells[9].data,
    credential_title: row.cells[10].data,
  };

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
 

