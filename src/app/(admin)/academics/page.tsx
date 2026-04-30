'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { Academics } from '@/types/academics';
import { academicsColumns } from './config/academics-column-config';
import EditAcademicsModal from './components/EditAcademicsModal';

const academicsConfig: CrudConfig<Academics> = {
  apiEndpoint: '/api/academics',
  columns: academicsColumns as any,
  modalComponent: EditAcademicsModal,
  labels: {
    title: 'Academics Management',
    deleteConfirm: 'Are you sure you want to delete this academic record?',
  },
  
};

export default function AcademicsPage() {
  return <CrudGridPage config={academicsConfig as any} />;
}
