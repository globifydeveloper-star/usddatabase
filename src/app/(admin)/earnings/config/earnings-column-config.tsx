'use client';

import {h,  html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '80px' },
    { id: 'median_1yr', name: '1-YR Median', sort: true, width: '80px' },
    { id: 'median_3yr', name: '3-YR Median', sort: true, width: '80px' },
    { id: 'median_4yr', name: '4-YR Median', sort: true, width: '80px'},
    { id: 'median_5yr', name: '5-YR Median', sort: true, width: '80px' },
    { id: 'students_count', name: 'Students Count', sort: true, width: '80px'},
   


{
  id: "action",
  name: "Action",
  sort: false,
  width: "80px",
 formatter: (cell: any) => {
  const rowData = cell; // full row object
 
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
      },
    },
    ];
 

