'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { Earnings } from '@/types/earnings';
import { studentColumns } from './config/earnings-column-config';
import EditEarningsModal from './components/EditEarningsModal';

const earningsConfig: CrudConfig<Earnings> = {
  apiEndpoint: '/api/earnings',
  columns: studentColumns as any,
  modalComponent: EditEarningsModal,
  labels: {
    title: 'Earnings Management',
    deleteConfirm: 'Are you sure you want to delete this earnings record?',
  },
};

export default function EarningsPage() {
  return <CrudGridPage config={earningsConfig as any} />;
}
