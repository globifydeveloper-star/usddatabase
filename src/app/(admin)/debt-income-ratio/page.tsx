'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { DebtIncomeRatio } from '@/types/debtIncomeRatio';
import { studentColumns } from './config/debt-income-ratio-column-config';
import EditDebtIncomeRatioModal from './components/EditDebtIncomeRatioModal';

const debtIncomeRatioConfig: CrudConfig<DebtIncomeRatio> = {
  apiEndpoint: '/api/debt-income-ratio',
  columns: studentColumns as any,
  modalComponent: EditDebtIncomeRatioModal,
  labels: {
    title: 'Debt Income Ratio Management',
    deleteConfirm: 'Are you sure you want to delete this debt income ratio record?',
  },
};

export default function DebtIncomeRatioPage() {
  return <CrudGridPage config={debtIncomeRatioConfig as any} />;
}
