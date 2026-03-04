'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { h,  html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const schoolsColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '80px' },
    { id: 'name', name: 'Name', sort: true, width: '250px' },
    { id: 'city', name: 'City', sort: true, width: '150px' },
    { id: 'state', name: 'State', sort: true, width: '80px' },
    { id: 'zip', name: 'Zip', sort: true, width: '120px' },
    { id: 'address', name: 'Address', sort: true, width: '200px' },
    { id: 'accreditor', name: 'Accreditor', sort: true, width: '280px' },
    {
        id: 'school_url',
        name: 'Website',
        sort: true,
        width: '200px',
        formatter: (cell: any) => {
            if (!cell) return '-';
            const safeUrl = normalizeUrl(cell);
            return html(
                `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" style="color:#0d6efd; text-decoration:underline;">${cell}</a>`
            );
        },
    },
    { id: 'degrees_awarded', name: 'Degrees', sort: true, width: '120px' },
    { id: 'has_pseo', name: 'PSEO', sort: true, width: '80px' },
    { id: 'ope8_id', name: 'OPE8 ID', sort: true, width: '100px' },
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
