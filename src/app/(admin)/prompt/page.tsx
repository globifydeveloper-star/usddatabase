'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { promptColumns } from './config/prompt-column-config';

const buildItemPath = (item:any)=> ['unitid'].map(k=>encodeURIComponent(item?.[k])).join('~');

const PromptModal = makeCrudModal({
  title: 'Prompt',
  apiEndpoint: '/api/prompt',
  buildItemPath,
  fields: [
    { key:'unitid', label:'Unitid', type:'fk-school', disabledOnEdit:true },
    { key:'cip_code', label:'Cip Code', type:'text' },
    { key:'title', label:'Title', type:'text' },
    { key:'credential_title', label:'Credential Title', type:'text' },
    { key:'school_name', label:'School Name', type:'text' },
  ],
});

const config: any = {
  apiEndpoint: '/api/prompt',
  columns: promptColumns,
  modalComponent: PromptModal,
  buildItemPath,
  showActions: false,
  labels: {
    title: 'Prompt',
    deleteConfirm: 'Are you sure you want to delete this Prompt record?',
  },
};

export default function PromptPage() {
  return <CrudGridPage config={config} />;
}
