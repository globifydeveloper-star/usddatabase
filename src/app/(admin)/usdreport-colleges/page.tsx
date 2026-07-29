'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { usdreportCollegesColumns } from './config/usdreport-colleges-column-config';

const buildItemPath = (item: any) => ['id'].map((k) => encodeURIComponent(item?.[k])).join('~');

const UsdreportCollegesModal = makeCrudModal({
  title: 'Usdreport Colleges',
  apiEndpoint: '/api/usdreport-colleges',
  buildItemPath,
  fields: [
    { key: 'report_id', label: 'Report Id', type: 'number', required: true },
    { key: 'unitid', label: 'School', type: 'fk-school', required: true },
    { key: 'program_name', label: 'Program Name', type: 'text' },
    { key: 'cip_code', label: 'Cip Code', type: 'text' },
    { key: 'display_order', label: 'Display Order', type: 'number' },
  ],
});

const config: any = {
  apiEndpoint: '/api/usdreport-colleges',
  columns: usdreportCollegesColumns,
  modalComponent: UsdreportCollegesModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Usdreport Colleges',
    deleteConfirm: 'Are you sure you want to delete this Usdreport Colleges record?',
  },
};

export default function UsdreportCollegesPage() {
  return <CrudGridPage config={config} />;
}
