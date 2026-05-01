'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { Admissions } from '@/types/admissions';
import { admissionColumns } from './config/admission-column-config';
import EditAdmissionsModal from './components/EditAdmissionsModal';

const admissionsConfig: CrudConfig<Admissions> = {
  apiEndpoint: '/api/admissions',
  columns: admissionColumns as any,
  modalComponent: EditAdmissionsModal,
  labels: {
    title: 'Admissions Management',
    deleteConfirm: 'Are you sure you want to delete this admission record?',
  },
};

export default function AdmissionsPage() {
  return <CrudGridPage config={admissionsConfig as any} />;
}