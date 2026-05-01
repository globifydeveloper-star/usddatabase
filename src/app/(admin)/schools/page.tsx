'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { School } from '@/types/schools';
import { schoolsColumns } from './config/schools-column-config';
import EditSchoolModal from './components/EditSchoolModal';

const schoolsConfig: CrudConfig<School> = {
  apiEndpoint: '/api/schools',
  columns: schoolsColumns as any,
  modalComponent: EditSchoolModal,
  labels: {
    title: 'Schools Management',
    deleteConfirm: 'Are you sure you want to delete this school?',
  },
};

export default function SchoolsPage() {
  return <CrudGridPage config={schoolsConfig as any} />;
}
