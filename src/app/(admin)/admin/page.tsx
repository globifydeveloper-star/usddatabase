'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { adminColumns } from './config/admin-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const AdminModal = makeCrudModal({
  title: 'Admin',
  apiEndpoint: '/api/admin',
  buildItemPath,
  fields: [
    { key:'full_name', label:'Full Name', type:'text', required:true },
    { key:'email', label:'Email', type:'text', required:true },
    { key:'password_hash', label:'Password Hash', type:'text', required:true },
    { key:'role', label:'Role', type:'text' },
    { key:'is_active', label:'Is Active', type:'switch' },
  ],
});

const config: any = {
  apiEndpoint: '/api/admin',
  columns: adminColumns,
  modalComponent: AdminModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Admin',
    deleteConfirm: 'Are you sure you want to delete this Admin record?',
  },
};

export default function AdminPage() {
  return <CrudGridPage config={config} />;
}
