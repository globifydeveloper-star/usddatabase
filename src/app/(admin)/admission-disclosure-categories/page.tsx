'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { admissionDisclosureCategoriesColumns } from './config/admission-disclosure-categories-column-config';

const buildItemPath = (item: any) => ['category'].map((k) => encodeURIComponent(item?.[k])).join('~');

const AdmissionDisclosureCategoriesModal = makeCrudModal({
  title: 'Admission Disclosure Categories',
  apiEndpoint: '/api/admission-disclosure-categories',
  buildItemPath,
  fields: [
    { key: 'category', label: 'Category', type: 'text', required: true, disabledOnEdit: true },
    { key: 'badge_label', label: 'Badge Label', type: 'text', required: true },
    { key: 'badge_color', label: 'Badge Color', type: 'text', required: true },
    { key: 'supporting_copy', label: 'Supporting Copy', type: 'textarea', required: true },
    { key: 'disclaimer_tier', label: 'Disclaimer Tier', type: 'number', required: true },
    { key: 'disclaimer_text', label: 'Disclaimer Text', type: 'textarea' },
    { key: 'show_admission_rate_required', label: 'Show Admission Rate Required', type: 'switch' },
  ],
});

const config: any = {
  apiEndpoint: '/api/admission-disclosure-categories',
  columns: admissionDisclosureCategoriesColumns,
  modalComponent: AdmissionDisclosureCategoriesModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Admission Disclosure Categories',
    deleteConfirm: 'Are you sure you want to delete this Admission Disclosure Category record?',
  },
};

export default function AdmissionDisclosureCategoriesPage() {
  return <CrudGridPage config={config} />;
}
