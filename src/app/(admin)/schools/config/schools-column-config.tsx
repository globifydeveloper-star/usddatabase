'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

export const schoolsColumns = [
     { id: 'unitid', name: 'Unit ID', sort: true, width: '120px' },
  { id: 'name', name: 'Name', sort: true, width: '250px' },
  { id: 'city', name: 'City', sort: true, width: '150px' },
  { id: 'state', name: 'State', sort: true, width: '100px' },
  { id: 'zip', name: 'Zip', sort: true, width: '120px' },
  { id: 'address', name: 'Address', sort: true, width: '300px' },
  { id: 'accreditor', name: 'Accreditor', sort: true, width: '300px' },
  { id: 'school_url', name: 'Website', sort: true, width: '200px' },
  { id: 'degrees_awarded', name: 'Degrees', sort: true, width: '120px' },
  { id: 'has_pseo', name: 'PSEO', sort: true, width: '100px' },
  { id: 'ope8_id', name: 'OPE8 ID', sort: true, width: '140px' },
    // {
    //   id: "action",
    //   name: "Action",
    //   sort: false,
    //   formatter: (cell: any) => {
    //     const id = cell

    //     return (
    //       <div className="d-flex gap-2 justify-content-center">
    //         <Link href={`/schools/edit/${id}`} className="text-reset fs-16 px-1">
    //           ✏️
    //         </Link>
    //         <Link href={`/schools/delete/${id}`} className="text-reset fs-16 px-1">
    //           🗑
    //         </Link>
    //       </div>
    //     )
    //   },
    // },
];
