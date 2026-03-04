'use client';

import { h, html } from 'gridjs';

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
   formatter: (cell: any) => {
              const rowData = cell; //full row object
  
              return h(
                  'div',
                  {
                      style: {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '14px',
                      },
                  },
                  [
                      h('svg', {
                          width: '20',
                          height: '20',
                          style: { cursor: 'pointer' },
                          onClick: () =>
                              window.dispatchEvent(
                                  new CustomEvent('openEditModal', { detail: rowData })
                              ),
                          children: [
                              h('path', { d: 'M12 20h9' }),
                              h('path', {
                                  d: 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z',
                              }),
                          ],
                      }),
                  ]
              );
          },
}  
];
