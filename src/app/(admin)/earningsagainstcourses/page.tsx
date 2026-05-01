'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { EarningsAgainstCourses } from '@/types/EarningsAgainstCourses';
import { studentColumns } from './config/earningsagainstcourses-column-config';
import EditearningsagainstModal from './components/EditearningsagainstModal';

const earningsAgainstCoursesConfig: CrudConfig<EarningsAgainstCourses> = {
  apiEndpoint: '/api/earningsagainstcourses',
  columns: studentColumns as any,
  modalComponent: EditearningsagainstModal,
  labels: {
    title: 'Earnings Against Courses Management',
    deleteConfirm: 'Are you sure you want to delete this earnings against courses record?',
  },
};

export default function EarningsagainstcoursesPage() {
  return <CrudGridPage config={earningsAgainstCoursesConfig as any} />;
}
