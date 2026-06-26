'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { userSavedProgramsColumns } from './config/user-saved-programs-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const UserSavedProgramsModal = makeCrudModal({
  title: 'User Saved Programs',
  apiEndpoint: '/api/user-saved-programs',
  buildItemPath,
  fields: [
    { key:'user_id', label:'User Id', type:'number', required:true },
    { key:'program_id', label:'Program Id', type:'fk-program', required:true },
  ],
});

const config: any = {
  apiEndpoint: '/api/user-saved-programs',
  columns: userSavedProgramsColumns,
  modalComponent: UserSavedProgramsModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'User Saved Programs',
    deleteConfirm: 'Are you sure you want to delete this User Saved Programs record?',
  },
};

export default function UserSavedProgramsPage() {
  return <CrudGridPage config={config} />;
}
