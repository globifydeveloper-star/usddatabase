'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { Repayment } from '@/types/repayment';
import { studentColumns } from './config/repayment-column-config';
import EditRepaymentModal from './components/EditRepaymentModal';

const repaymentConfig: CrudConfig<Repayment> = {
  apiEndpoint: '/api/repayment',
  columns: studentColumns as any,
  modalComponent: EditRepaymentModal,
  labels: {
    title: 'Repayment Management',
    deleteConfirm: 'Are you sure you want to delete this repayment record?',
  },
};

export default function RepaymentPage() {
  return <CrudGridPage config={repaymentConfig as any} />;
}
