'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { programDescriptionsColumns } from './config/program-descriptions-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const ProgramDescriptionsModal = makeCrudModal({
  title: 'Program Descriptions',
  apiEndpoint: '/api/program-descriptions',
  buildItemPath,
  fields: [
    { key:'unitid', label:'Unitid', type:'fk-school', required:true },
    { key:'cip_code', label:'Cip Code', type:'text', required:true },
    { key:'title', label:'Title', type:'text', required:true },
    { key:'credential_title', label:'Credential Title', type:'text', required:true },
    { key:'school_name', label:'School Name', type:'text', required:true },
    { key:'program_description', label:'Program Description', type:'textarea' },
  ],
});

const config: any = {
  apiEndpoint: '/api/program-descriptions',
  columns: programDescriptionsColumns,
  modalComponent: ProgramDescriptionsModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Program Descriptions',
    deleteConfirm: 'Are you sure you want to delete this Program Descriptions record?',
  },
};

export default function ProgramDescriptionsPage() {
  return <CrudGridPage config={config} />;
}
