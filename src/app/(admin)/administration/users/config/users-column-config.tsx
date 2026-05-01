'use client';

import { h } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const userColumns = [
    { id: 'id', name: 'ID', sort: true, width: '60px' },
    { id: 'full_name', name: 'Full Name', sort: true },
    { id: 'email', name: 'Email', sort: true, width: '140px' },
    { id: 'role_name', name: 'Role', sort: true },
    { id: 'is_active', name: 'Status', sort: true },
    { id: 'last_login', name: 'Last Login', sort: true },
    { id: 'created_at', name: 'Created At', sort: true },
];