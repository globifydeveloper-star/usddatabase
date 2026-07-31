'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import AccessDeniedAlert from '@/components/AccessDeniedAlert';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { cmsAuditLogsColumns } from './config/cms-audit-logs-column-config';

const config: any = {
  apiEndpoint: '/api/cms-audit-logs',
  columns: cmsAuditLogsColumns,
  modalComponent: null,
  showAddButton: false,
  showActions: false,
  labels: {
    title: 'Audit Logs',
    deleteConfirm: '',
  },
};

export default function CmsAuditLogsPage() {
  const currentUser = useCurrentUser();
  if (currentUser?.role === 'viewer') return <AccessDeniedAlert />;
  return <CrudGridPage config={config} />;
}
