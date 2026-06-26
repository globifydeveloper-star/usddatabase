'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { usduserPreferredStatesColumns } from './config/usduser-preferred-states-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const UsduserPreferredStatesModal = makeCrudModal({
  title: 'Usduser Preferred States',
  apiEndpoint: '/api/usduser-preferred-states',
  buildItemPath,
  fields: [
    { key:'id', label:'Id', type:'number', required:true, disabledOnEdit:true },
    { key:'user_id', label:'User Id', type:'number', required:true },
    { key:'state_code', label:'State Code', type:'text', required:true },
  ],
});

const config: any = {
  apiEndpoint: '/api/usduser-preferred-states',
  columns: usduserPreferredStatesColumns,
  modalComponent: UsduserPreferredStatesModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Usduser Preferred States',
    deleteConfirm: 'Are you sure you want to delete this Usduser Preferred States record?',
  },
};

export default function UsduserPreferredStatesPage() {
  return <CrudGridPage config={config} />;
}
