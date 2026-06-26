'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { usduserPreferredProgramsColumns } from './config/usduser-preferred-programs-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const UsduserPreferredProgramsModal = makeCrudModal({
  title: 'Usduser Preferred Programs',
  apiEndpoint: '/api/usduser-preferred-programs',
  buildItemPath,
  fields: [
    { key:'id', label:'Id', type:'number', required:true, disabledOnEdit:true },
    { key:'user_id', label:'User Id', type:'number', required:true },
    { key:'program', label:'Program', type:'text', required:true },
  ],
});

const config: any = {
  apiEndpoint: '/api/usduser-preferred-programs',
  columns: usduserPreferredProgramsColumns,
  modalComponent: UsduserPreferredProgramsModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Usduser Preferred Programs',
    deleteConfirm: 'Are you sure you want to delete this Usduser Preferred Programs record?',
  },
};

export default function UsduserPreferredProgramsPage() {
  return <CrudGridPage config={config} />;
}
