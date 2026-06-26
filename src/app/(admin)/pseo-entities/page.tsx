'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { pseoEntitiesColumns } from './config/pseo-entities-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const PseoEntitiesModal = makeCrudModal({
  title: 'Pseo Entities',
  apiEndpoint: '/api/pseo-entities',
  buildItemPath,
  fields: [
    { key:'entity_type', label:'Entity Type', type:'text' },
    { key:'entity_code', label:'Entity Code', type:'text', required:true },
    { key:'entity_name', label:'Entity Name', type:'text', required:true },
  ],
});

const config: any = {
  apiEndpoint: '/api/pseo-entities',
  columns: pseoEntitiesColumns,
  modalComponent: PseoEntitiesModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Pseo Entities',
    deleteConfirm: 'Are you sure you want to delete this Pseo Entities record?',
  },
};

export default function PseoEntitiesPage() {
  return <CrudGridPage config={config} />;
}
