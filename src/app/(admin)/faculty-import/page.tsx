'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { facultyImportColumns } from './config/faculty-import-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const FacultyImportModal = makeCrudModal({
  title: 'Faculty Import',
  apiEndpoint: '/api/faculty-import',
  buildItemPath,
  fields: [
    { key:'id', label:'Id', type:'number', required:true, disabledOnEdit:true },
    { key:'faculty_men', label:'Faculty Men', type:'number' },
    { key:'faculty_women', label:'Faculty Women', type:'number' },
  ],
});

const config: any = {
  apiEndpoint: '/api/faculty-import',
  columns: facultyImportColumns,
  modalComponent: FacultyImportModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Faculty Import',
    deleteConfirm: 'Are you sure you want to delete this Faculty Import record?',
  },
};

export default function FacultyImportPage() {
  return <CrudGridPage config={config} />;
}
