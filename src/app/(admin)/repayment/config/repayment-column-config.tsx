'use client';

import {h } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '80px' },
    { id: 'yr1_completers', name: '1-YR Completers', sort: true, width: '150px' },
    { id: 'yr1_noncompleters', name: '1-YR Non-Completers', sort: true, width: '180px' },
    { id: 'yr1_overall', name: '1-YR Overall', sort: true, width: '120px' },
    { id: 'yr3_completers', name: '3-YR Completers', sort: true, width: '150px' },
    { id: 'yr3_noncompleters', name: '3-YR Non-Completers', sort: true, width: '180px' },
    { id: 'yr3_overall', name: '3-YR Overall', sort: true, width: '120px' },
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
