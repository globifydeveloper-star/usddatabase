'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { stagingAdmissionsCategoriesColumns } from './config/staging-admissions-categories-column-config';

const buildItemPath = (item: any) => ['unitid'].map((k) => encodeURIComponent(item?.[k])).join('~');

const StagingAdmissionsCategoriesModal = makeCrudModal({
  title: 'Staging Admissions Categories',
  apiEndpoint: '/api/staging-admissions-categories',
  buildItemPath,
  fields: [
    { key: 'unitid', label: 'School', type: 'fk-school', required: true, disabledOnEdit: true },
    { key: 'sat_disclosure_category', label: 'SAT Disclosure Category', type: 'text', required: true },
    { key: 'publish_publicly', label: 'Publish Publicly', type: 'switch' },
    { key: 'review_status', label: 'Review Status', type: 'text', required: true },
  ],
});

const config: any = {
  apiEndpoint: '/api/staging-admissions-categories',
  columns: stagingAdmissionsCategoriesColumns,
  modalComponent: StagingAdmissionsCategoriesModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Staging Admissions Categories',
    deleteConfirm: 'Are you sure you want to delete this Staging Admissions Categories record?',
  },
};

export default function StagingAdmissionsCategoriesPage() {
  return <CrudGridPage config={config} />;
}
