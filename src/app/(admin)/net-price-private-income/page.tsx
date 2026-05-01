'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { NetPricePrivateIncome } from '@/types/netPricePrivateIncome';
import { studentColumns } from './config/net-price-private-income-column-config';
import EditNetPricePrivateIncomeModal from './components/EditNetPricePrivateIncomeModal';

const netPricePrivateIncomeConfig: CrudConfig<NetPricePrivateIncome> = {
  apiEndpoint: '/api/net-price-private-income',
  columns: studentColumns as any,
  modalComponent: EditNetPricePrivateIncomeModal,
  labels: {
    title: 'Net Price Private Income Management',
    deleteConfirm: 'Are you sure you want to delete this net price private income record?',
  },
};

export default function NetPricePrivateIncomePage() {
  return <CrudGridPage config={netPricePrivateIncomeConfig as any} />;
}
