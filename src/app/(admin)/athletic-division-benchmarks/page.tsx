'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { athleticDivisionBenchmarksColumns } from './config/athletic-division-benchmarks-column-config';

const buildItemPath = (item: any) =>
  ['division', 'survey_year'].map((k) => encodeURIComponent(item?.[k])).join('~');

const AthleticDivisionBenchmarksModal = makeCrudModal({
  title: 'Athletic Division Benchmarks',
  apiEndpoint: '/api/athletic-division-benchmarks',
  buildItemPath,
  fields: [
    { key: 'division', label: 'Division', type: 'text', required: true, disabledOnEdit: true },
    { key: 'survey_year', label: 'Survey Year', type: 'text', required: true, disabledOnEdit: true },
    { key: 'avg_athletes_total', label: 'Avg Athletes Total', type: 'number' },
    { key: 'avg_aid_per_athlete', label: 'Avg Aid Per Athlete', type: 'number' },
    { key: 'avg_recruiting_expense', label: 'Avg Recruiting Expense', type: 'number' },
    { key: 'avg_revenue', label: 'Avg Revenue', type: 'number' },
    { key: 'avg_expense', label: 'Avg Expense', type: 'number' },
  ],
});

const config: any = {
  apiEndpoint: '/api/athletic-division-benchmarks',
  columns: athleticDivisionBenchmarksColumns,
  modalComponent: AthleticDivisionBenchmarksModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Athletic Division Benchmarks',
    deleteConfirm: 'Are you sure you want to delete this Athletic Division Benchmarks record?',
  },
};

export default function AthleticDivisionBenchmarksPage() {
  return <CrudGridPage config={config} />;
}
