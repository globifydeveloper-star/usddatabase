'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { usdreportsColumns } from './config/usdreports-column-config';

const buildItemPath = (item: any) => ['id'].map((k) => encodeURIComponent(item?.[k])).join('~');

const UsdreportsModal = makeCrudModal({
  title: 'Usdreports',
  apiEndpoint: '/api/usdreports',
  buildItemPath,
  fields: [
    { key: 'report_reference_id', label: 'Report Reference Id', type: 'text', required: true },
    { key: 'user_id', label: 'User Id', type: 'number', required: true },
    { key: 'pdf_storage_path', label: 'Pdf Storage Path', type: 'text' },
    { key: 'mime_type', label: 'Mime Type', type: 'text' },
  ],
});

const config: any = {
  apiEndpoint: '/api/usdreports',
  columns: usdreportsColumns,
  modalComponent: UsdreportsModal,
  buildItemPath,
  showActions: true,
  showEditAction: false,
  downloadAction: {
    getUrl: (item: any) => `/api/usdreports/${encodeURIComponent(item.id)}/download`,
  },
  labels: {
    title: 'Usdreports',
    deleteConfirm: 'Are you sure you want to delete this Usdreports record?',
  },
};

export default function UsdreportsPage() {
  return <CrudGridPage config={config} />;
}
