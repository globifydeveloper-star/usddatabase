'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { admissionsSatUiColumns } from './config/admissions-sat-ui-column-config';

const config: any = {
  apiEndpoint: '/api/admissions-sat-ui',
  columns: admissionsSatUiColumns,
  showActions: false,
  showAddButton: false,
  labels: {
    title: 'Admissions SAT UI',
    deleteConfirm: '',
  },
};

export default function AdmissionsSatUiPage() {
  return <CrudGridPage config={config} />;
}
