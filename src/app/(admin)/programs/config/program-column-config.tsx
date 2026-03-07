'use client';

import { h , html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const programColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '80px' },
    { id: 'cip_code', name: 'CIP Code', sort: true, width: '60px' },
    { id: 'title', name: 'Program Title', sort: true, width: '160px' },
    { id: 'credential_level', name: 'Credential Level', sort: true, width: '100px' },
    { id: 'credential_title', name: 'Credential Title', sort: true, width: '150px' },
    { id: 'school_name', name: 'School Name', sort: true, width: '250px' },
    { id: 'school_type', name: 'School Type', sort: true, width: '120px' },
{
  id: "action",
  name: "Action",
  sort: false,
  width: "80px",
  formatter: (cell: any ) => {
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
    }, 
];
