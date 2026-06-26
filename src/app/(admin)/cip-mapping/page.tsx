'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { cipMappingColumns } from './config/cip-mapping-column-config';

const buildItemPath = (item:any)=> ['cip_prefix'].map(k=>encodeURIComponent(item?.[k])).join('~');

const CipMappingModal = makeCrudModal({
  title: 'Cip Mapping',
  apiEndpoint: '/api/cip-mapping',
  buildItemPath,
  fields: [
    { key:'cip_prefix', label:'Cip Prefix', type:'text', required:true, disabledOnEdit:true },
    { key:'field_name', label:'Field Name', type:'text' },
  ],
});

const config: any = {
  apiEndpoint: '/api/cip-mapping',
  columns: cipMappingColumns,
  modalComponent: CipMappingModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Cip Mapping',
    deleteConfirm: 'Are you sure you want to delete this Cip Mapping record?',
  },
};

export default function CipMappingPage() {
  return <CrudGridPage config={config} />;
}
