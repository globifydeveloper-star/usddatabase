'use client';

import { h } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'unitid', name: 'Unit ID', sort: true, width: '60px' },
    { id: 'loan_principal', name: 'Loan Principal', sort: true, width: '80px' },
    { id: 'pell_grant_rate', name: 'Pell Grant Rate', sort: true, width: '80px' },
    { id: 'federal_loan_rate', name: 'Federal loan', sort: true, width: '80px' },
    { id: 'students_with_any_loan', name: 'Students With Any Loan', sort: true, width: '100px' },
];
