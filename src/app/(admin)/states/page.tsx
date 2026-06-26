'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { statesColumns } from './config/states-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const StatesModal = makeCrudModal({
  title: 'States',
  apiEndpoint: '/api/states',
  buildItemPath,
  fields: [
    { key:'state_code', label:'State Code', type:'text', required:true },
    { key:'state_title', label:'State Title', type:'text', required:true },
  ],
});

const config: any = {
  apiEndpoint: '/api/states',
  columns: statesColumns,
  modalComponent: StatesModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'States',
    deleteConfirm: 'Are you sure you want to delete this States record?',
  },
};

export default function StatesPage() {
  return <CrudGridPage config={config} />;
}
