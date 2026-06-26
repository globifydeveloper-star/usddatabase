'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { userSavedCollegesColumns } from './config/user-saved-colleges-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const UserSavedCollegesModal = makeCrudModal({
  title: 'User Saved Colleges',
  apiEndpoint: '/api/user-saved-colleges',
  buildItemPath,
  fields: [
    { key:'user_id', label:'User Id', type:'number', required:true },
    { key:'unitid', label:'Unitid', type:'fk-school', required:true },
  ],
});

const config: any = {
  apiEndpoint: '/api/user-saved-colleges',
  columns: userSavedCollegesColumns,
  modalComponent: UserSavedCollegesModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'User Saved Colleges',
    deleteConfirm: 'Are you sure you want to delete this User Saved Colleges record?',
  },
};

export default function UserSavedCollegesPage() {
  return <CrudGridPage config={config} />;
}
