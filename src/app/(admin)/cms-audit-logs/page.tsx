'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
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
  return <CrudGridPage config={config} />;
}
