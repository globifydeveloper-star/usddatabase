'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { userCompareHistoryColumns } from './config/user-compare-history-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const UserCompareHistoryModal = makeCrudModal({
  title: 'User Compare History',
  apiEndpoint: '/api/user-compare-history',
  buildItemPath,
  fields: [
    { key:'user_id', label:'User Id', type:'number', required:true },
    { key:'compared_colleges', label:'Compared Colleges', type:'json', required:true },
  ],
});

const config: any = {
  apiEndpoint: '/api/user-compare-history',
  columns: userCompareHistoryColumns,
  modalComponent: UserCompareHistoryModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'User Compare History',
    deleteConfirm: 'Are you sure you want to delete this User Compare History record?',
  },
};

export default function UserCompareHistoryPage() {
  return <CrudGridPage config={config} />;
}
