'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { usdusersPreferredProgramsColumns } from './config/usdusers-preferred-programs-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const UsdusersPreferredProgramsModal = makeCrudModal({
  title: 'Usdusers Preferred Programs',
  apiEndpoint: '/api/usdusers-preferred-programs',
  buildItemPath,
  fields: [
    { key:'user_id', label:'User Id', type:'number', required:true },
    { key:'program', label:'Program', type:'text', required:true },
  ],
});

const config: any = {
  apiEndpoint: '/api/usdusers-preferred-programs',
  columns: usdusersPreferredProgramsColumns,
  modalComponent: UsdusersPreferredProgramsModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Usdusers Preferred Programs',
    deleteConfirm: 'Are you sure you want to delete this Usdusers Preferred Programs record?',
  },
};

export default function UsdusersPreferredProgramsPage() {
  return <CrudGridPage config={config} />;
}
