'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { ProgramDistribution } from '@/types/programDistribution';
import { programDistributionColumns } from './config/program-distribution-column-config';

const programDistributionConfig: CrudConfig<ProgramDistribution> = {
  apiEndpoint: '/api/program-distribution',
  columns: programDistributionColumns as any,
  modalComponent: null as any,
  labels: {
    title: 'Program Distribution Management',
    deleteConfirm: 'Are you sure you want to delete this program distribution record?',
  },
  showAddButton: false,
  showActions: false,
};

export default function ProgramDistributionPage() {
  return <CrudGridPage config={programDistributionConfig as any} />;
}
