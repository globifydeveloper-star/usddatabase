'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { schoolDescriptionsColumns } from './config/school-descriptions-column-config';

const buildItemPath = (item:any)=> ['unitid'].map(k=>encodeURIComponent(item?.[k])).join('~');

const SchoolDescriptionsModal = makeCrudModal({
  title: 'School Descriptions',
  apiEndpoint: '/api/school-descriptions',
  buildItemPath,
  fields: [
    { key:'unitid', label:'Unitid', type:'text', required:true, disabledOnEdit:true },
    { key:'name', label:'Name', type:'text' },
    { key:'city', label:'City', type:'text' },
    { key:'state', label:'State', type:'text' },
    { key:'school_url', label:'School Url', type:'text' },
    { key:'school_descriptions', label:'School Descriptions', type:'textarea' },
  ],
});

const config: any = {
  apiEndpoint: '/api/school-descriptions',
  columns: schoolDescriptionsColumns,
  modalComponent: SchoolDescriptionsModal,
  buildItemPath,
  showActions: false,
  labels: {
    title: 'School Descriptions',
    deleteConfirm: 'Are you sure you want to delete this School Descriptions record?',
  },
};

export default function SchoolDescriptionsPage() {
  return <CrudGridPage config={config} />;
}
