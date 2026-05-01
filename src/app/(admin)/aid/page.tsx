'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { Aid } from '@/types/aid';
import { studentColumns } from './config/aid-column-config';
import EditAidModal from './components/EditAidModal';

const aidConfig: CrudConfig<Aid> = {
  apiEndpoint: '/api/aid',
  columns: studentColumns as any,
  modalComponent: EditAidModal,
  labels: {
    title: 'Aid Management',
    deleteConfirm: 'Are you sure you want to delete this aid record?',
  },
};

export default function AidPage() {
  return <CrudGridPage config={aidConfig as any} />;
}
