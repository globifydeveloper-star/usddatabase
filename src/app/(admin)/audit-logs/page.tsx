'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { auditLogsColumns } from './config/audit-logs-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const AuditLogsModal = makeCrudModal({
  title: 'Audit Logs',
  apiEndpoint: '/api/audit-logs',
  buildItemPath,
  fields: [
    { key:'table_name', label:'Table Name', type:'text' },
    { key:'row_id', label:'Row Id', type:'number' },
    { key:'action', label:'Action', type:'text' },
    { key:'changed_by', label:'Changed By', type:'number' },
    { key:'changed_at', label:'Changed At', type:'datetime' },
    { key:'user_type', label:'User Type', type:'text' },
    { key:'user_id', label:'User Id', type:'number' },
  ],
});

const config: any = {
  apiEndpoint: '/api/audit-logs',
  columns: auditLogsColumns,
  modalComponent: AuditLogsModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Audit Logs',
    deleteConfirm: 'Are you sure you want to delete this Audit Logs record?',
  },
};

export default function AuditLogsPage() {
  return <CrudGridPage config={config} />;
}
