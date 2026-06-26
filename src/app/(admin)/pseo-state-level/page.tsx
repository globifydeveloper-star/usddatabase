'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { pseoStateLevelColumns } from './config/pseo-state-level-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const PseoStateLevelModal = makeCrudModal({
  title: 'Pseo State Level',
  apiEndpoint: '/api/pseo-state-level',
  buildItemPath,
  fields: [
    { key:'pseo_entity_id', label:'Pseo Entity Id', type:'number' },
    { key:'cip_code', label:'Cip Code', type:'text' },
    { key:'cip_title', label:'Cip Title', type:'text' },
    { key:'grad_cohort', label:'Grad Cohort', type:'text' },
    { key:'year_after_completion', label:'Year After Completion', type:'number' },
    { key:'median_earnings', label:'Median Earnings', type:'number' },
  ],
});

const config: any = {
  apiEndpoint: '/api/pseo-state-level',
  columns: pseoStateLevelColumns,
  modalComponent: PseoStateLevelModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Pseo State Level',
    deleteConfirm: 'Are you sure you want to delete this Pseo State Level record?',
  },
};

export default function PseoStateLevelPage() {
  return <CrudGridPage config={config} />;
}
