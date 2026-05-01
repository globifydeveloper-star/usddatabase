'use client';

import { h, html } from 'gridjs';

function normalizeUrl(url: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export const rolesColumns = [
     { id: 'id', name: 'ID', sort: true },
  { id: 'role_name', name: 'Full Name', sort: true },
];
