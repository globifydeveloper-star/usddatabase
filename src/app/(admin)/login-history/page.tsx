'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { loginHistoryColumns } from './config/login-history-column-config';

const config: any = {
  apiEndpoint: '/api/cms-login-history',
  columns: loginHistoryColumns,
  modalComponent: null,
  showAddButton: false,
  showActions: false,
  labels: {
    title: 'Login History',
    deleteConfirm: '',
  },
};

export default function LoginHistoryPage() {
  return <CrudGridPage config={config} />;
}
