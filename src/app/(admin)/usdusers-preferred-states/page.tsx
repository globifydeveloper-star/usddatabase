'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { usdusersPreferredStatesColumns } from './config/usdusers-preferred-states-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const UsdusersPreferredStatesModal = makeCrudModal({
  title: 'Usdusers Preferred States',
  apiEndpoint: '/api/usdusers-preferred-states',
  buildItemPath,
  fields: [
    { key:'user_id', label:'User Id', type:'number', required:true },
    { key:'state_code', label:'State Code', type:'text', required:true },
  ],
});

const config: any = {
  apiEndpoint: '/api/usdusers-preferred-states',
  columns: usdusersPreferredStatesColumns,
  modalComponent: UsdusersPreferredStatesModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Usdusers Preferred States',
    deleteConfirm: 'Are you sure you want to delete this Usdusers Preferred States record?',
  },
};

export default function UsdusersPreferredStatesPage() {
  return <CrudGridPage config={config} />;
}
