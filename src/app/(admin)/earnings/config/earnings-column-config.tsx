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
];
 

