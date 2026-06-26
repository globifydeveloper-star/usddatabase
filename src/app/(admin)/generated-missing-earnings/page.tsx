'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { generatedMissingEarningsColumns } from './config/generated-missing-earnings-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const GeneratedMissingEarningsModal = makeCrudModal({
  title: 'Generated Missing Earnings',
  apiEndpoint: '/api/generated-missing-earnings',
  buildItemPath,
  fields: [
    { key:'unitid', label:'Unitid', type:'fk-school', required:true },
    { key:'school_name', label:'School Name', type:'text' },
    { key:'cip_code', label:'Cip Code', type:'text', required:true },
    { key:'cip_title', label:'Cip Title', type:'text' },
    { key:'credential_level', label:'Credential Level', type:'number', required:true },
    { key:'credential_title', label:'Credential Title', type:'text' },
    { key:'grad_cohort', label:'Grad Cohort', type:'text', required:true },
    { key:'year_1', label:'Year 1', type:'number' },
    { key:'year_1_status', label:'Year 1 Status', type:'text' },
    { key:'year_5', label:'Year 5', type:'number' },
    { key:'year_5_status', label:'Year 5 Status', type:'text' },
    { key:'year_10', label:'Year 10', type:'number' },
    { key:'year_10_status', label:'Year 10 Status', type:'text' },
    { key:'missing_columns', label:'Missing Columns', type:'textarea' },
    { key:'year_1_final', label:'Year 1 Final', type:'number' },
    { key:'year_1_method', label:'Year 1 Method', type:'text' },
    { key:'year_5_final', label:'Year 5 Final', type:'number' },
    { key:'year_5_method', label:'Year 5 Method', type:'text' },
    { key:'year_10_final', label:'Year 10 Final', type:'number' },
    { key:'year_10_method', label:'Year 10 Method', type:'text' },
    { key:'ratio_source', label:'Ratio Source', type:'text' },
  ],
});

const config: any = {
  apiEndpoint: '/api/generated-missing-earnings',
  columns: generatedMissingEarningsColumns,
  modalComponent: GeneratedMissingEarningsModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Generated Missing Earnings',
    deleteConfirm: 'Are you sure you want to delete this Generated Missing Earnings record?',
  },
};

export default function GeneratedMissingEarningsPage() {
  return <CrudGridPage config={config} />;
}
