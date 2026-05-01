'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { NetPricePublicIncome } from '@/types/netPricePublicIncome';
import { studentColumns } from './config/net-price-public-income-column-config';
import EditNetPricePublicIncomeModal from './components/EditNetPricePublicIncomeModal';

const netPricePublicIncomeConfig: CrudConfig<NetPricePublicIncome> = {
  apiEndpoint: '/api/net-price-public-income',
  columns: studentColumns as any,
  modalComponent: EditNetPricePublicIncomeModal,
  labels: {
    title: 'Net Price Public Income Management',
    deleteConfirm: 'Are you sure you want to delete this net price public income record?',
  },
};

export default function NetPricePublicIncomePage() {
  return <CrudGridPage config={netPricePublicIncomeConfig as any} />;
}
