'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { earningsAgainstCoursesMergedColumns } from './config/earnings-against-courses-merged-column-config';

const buildItemPath = (item: any) => ['id'].map((k) => encodeURIComponent(item?.[k])).join('~');

const EarningsAgainstCoursesMergedModal = makeCrudModal({
  title: 'Earnings Against Courses Merged',
  apiEndpoint: '/api/earnings-against-courses-merged',
  buildItemPath,
  fields: [
    { key: 'unitid', label: 'Unit Id', type: 'number', required: true },
    { key: 'ope8_id', label: 'Ope8 Id', type: 'text' },
    { key: 'school_name', label: 'School Name', type: 'text', required: true },
    { key: 'cip_title', label: 'Cip Title', type: 'text' },
    { key: 'cip_code', label: 'Cip Code', type: 'text' },
    { key: 'grad_cohort', label: 'Grad Cohort', type: 'text' },
    { key: 'credential_level', label: 'Credential Level', type: 'number' },
    { key: 'credential_title', label: 'Credential Title', type: 'text' },
    { key: 'year_1', label: 'Year 1', type: 'number' },
    { key: 'year_5', label: 'Year 5', type: 'number' },
    { key: 'year_10', label: 'Year 10', type: 'number' },
    { key: 'avg_salary', label: 'Avg Salary', type: 'number' },
    { key: 'growth_rate', label: 'Growth Rate', type: 'number' },
    { key: 'year_1_method', label: 'Year 1 Method', type: 'text' },
    { key: 'year_5_method', label: 'Year 5 Method', type: 'text' },
    { key: 'year_10_method', label: 'Year 10 Method', type: 'text' },
  ],
});

const config: any = {
  apiEndpoint: '/api/earnings-against-courses-merged',
  columns: earningsAgainstCoursesMergedColumns,
  modalComponent: EarningsAgainstCoursesMergedModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Earnings Against Courses Merged',
    deleteConfirm: 'Are you sure you want to delete this record?',
  },
};

export default function EarningsAgainstCoursesMergedPage() {
  return <CrudGridPage config={config} />;
}
