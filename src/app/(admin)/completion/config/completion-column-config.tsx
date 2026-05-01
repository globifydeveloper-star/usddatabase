'use client';

import { h } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '120px' },
    { id: 'completed_2yrs', name: 'Completed 2 Yrs', sort: true, width: '80px' },
    { id: 'completed_3yrs', name: 'Completed 3 Yrs', sort: true, width: '80px' },
    { id: 'completed_4yrs', name: 'Completed 4 Yrs', sort: true, width: '80px' },
    { id: 'completed_6yrs', name: 'Completed 6 Yrs', sort: true, width: '80px' },
    { id: 'emp_factor', name: 'Emp Factor', sort: true, width: '80px' },
    { id: 'completion_rate', name: 'Completion Rate', sort: true, width: '120px' },
];
