'use client';

import { h } from 'gridjs';

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
];
