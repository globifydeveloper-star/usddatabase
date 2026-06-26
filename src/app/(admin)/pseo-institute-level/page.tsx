'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { pseoInstituteLevelColumns } from './config/pseo-institute-level-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const PseoInstituteLevelModal = makeCrudModal({
  title: 'Pseo Institute Level',
  apiEndpoint: '/api/pseo-institute-level',
  buildItemPath,
  fields: [
    { key:'pseo_entity_id', label:'Pseo Entity Id', type:'number' },
    { key:'cip_code', label:'Cip Code', type:'text' },
    { key:'cip_title', label:'Cip Title', type:'text' },
    { key:'grad_cohort', label:'Grad Cohort', type:'text' },
    { key:'year_after_completion', label:'Year After Completion', type:'number' },
    { key:'median_earnings', label:'Median Earnings', type:'number' },
    { key:'cip_code_clean', label:'Cip Code Clean', type:'text' },
  ],
});

const config: any = {
  apiEndpoint: '/api/pseo-institute-level',
  columns: pseoInstituteLevelColumns,
  modalComponent: PseoInstituteLevelModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Pseo Institute Level',
    deleteConfirm: 'Are you sure you want to delete this Pseo Institute Level record?',
  },
};

export default function PseoInstituteLevelPage() {
  return <CrudGridPage config={config} />;
}
