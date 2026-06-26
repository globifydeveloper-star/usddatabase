'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { authenticationColumns } from './config/authentication-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const AuthenticationModal = makeCrudModal({
  title: 'Authentication',
  apiEndpoint: '/api/authentication',
  buildItemPath,
  fields: [
    { key:'full_name', label:'Full Name', type:'text' },
    { key:'email', label:'Email', type:'text' },
    { key:'password_hash', label:'Password Hash', type:'text' },
    { key:'role_name', label:'Role Name', type:'text' },
    { key:'is_active', label:'Is Active', type:'switch' },
    { key:'last_login', label:'Last Login', type:'datetime' },
    { key:'table_name', label:'Table Name', type:'text' },
    { key:'can_read', label:'Can Read', type:'switch' },
    { key:'can_edit', label:'Can Edit', type:'switch' },
    { key:'can_delete', label:'Can Delete', type:'switch' },
  ],
});

const config: any = {
  apiEndpoint: '/api/authentication',
  columns: authenticationColumns,
  modalComponent: AuthenticationModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Authentication',
    deleteConfirm: 'Are you sure you want to delete this Authentication record?',
  },
};

export default function AuthenticationPage() {
  return <CrudGridPage config={config} />;
}
