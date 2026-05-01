'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { Costs } from '@/types/costs';
import { studentColumns } from './config/costs-column-config';
import EditCostsModal from './components/EditCostsModal';

const costsConfig: CrudConfig<Costs> = {
  apiEndpoint: '/api/costs',
  columns: studentColumns as any,
  modalComponent: EditCostsModal,
  labels: {
    title: 'Costs Management',
    deleteConfirm: 'Are you sure you want to delete this costs record?',
  },
};

export default function CostsPage() {
  return <CrudGridPage config={costsConfig as any} />;
}