'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { usduserDeactivationsColumns } from './config/usduser-deactivations-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const UsduserDeactivationsModal = makeCrudModal({
  title: 'Usduser Deactivations',
  apiEndpoint: '/api/usduser-deactivations',
  buildItemPath,
  fields: [
    { key:'id', label:'Id', type:'number', required:true, disabledOnEdit:true },
    { key:'user_id', label:'User Id', type:'number', required:true },
    { key:'reason_code', label:'Reason Code', type:'text', required:true },
    { key:'reason_label', label:'Reason Label', type:'text', required:true },
    { key:'other_reason', label:'Other Reason', type:'textarea' },
    { key:'improvement_feedback', label:'Improvement Feedback', type:'textarea' },
    { key:'acknowledged', label:'Acknowledged', type:'switch' },
  ],
});

const config: any = {
  apiEndpoint: '/api/usduser-deactivations',
  columns: usduserDeactivationsColumns,
  modalComponent: UsduserDeactivationsModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Usduser Deactivations',
    deleteConfirm: 'Are you sure you want to delete this Usduser Deactivations record?',
  },
};

export default function UsduserDeactivationsPage() {
  return <CrudGridPage config={config} />;
}
