'use client';

import { h } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const studentColumns = [
    { id: 'id', name: 'ID', hidden: true, width: '80px'},
    { id: 'unitid', name: 'Unit ID', sort: true, width: '120px' },
    { id: 'ope8_id', name: 'Ope8_id', sort: true, width: '100px' },
    { id: 'school_name', name: 'School Name', sort: true, width: '180px' },
    { id: 'cip_code', name: 'Cip Code', sort: true, width: '100px' },
    { id: 'cip_title', name: 'Cip Title', sort: true, width: '160px' },
    { id: 'grad_cohort', name: 'Grad Cohort', sort: true, width: '120px' },
    { id: 'year_1', name: '1st year', sort: true, width: '100px' },
    { id: 'year_5', name: '5th Year', sort: true, width: '120px' },
    { id: 'year_10', name: '10th Year', sort: true, width: '120px' },
    { id: 'credential_level', name: 'Credential Level', sort: true, width: '120px' },
    { id: 'credential_title', name: 'Credential Title', sort: true, width: '180px' },
    { id: 'avg_salary', name: 'Avg Salary', sort: true, width: '120px' },
];
