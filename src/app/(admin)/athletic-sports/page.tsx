'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { athleticSportsColumns } from './config/athletic-sports-column-config';

const buildItemPath = (item:any)=> ['unitid','sport','gender','division','survey_year'].map(k=>encodeURIComponent(item?.[k])).join('~');

const AthleticSportsModal = makeCrudModal({
  title: 'Athletic Sports',
  apiEndpoint: '/api/athletic-sports',
  buildItemPath,
  fields: [
    { key:'unitid', label:'Unitid', type:'fk-school', required:true, disabledOnEdit:true },
    { key:'sport', label:'Sport', type:'text', required:true, disabledOnEdit:true },
    { key:'gender', label:'Gender', type:'text', required:true, disabledOnEdit:true },
    { key:'roster_size', label:'Roster Size', type:'number' },
    { key:'division', label:'Division', type:'text', required:true, disabledOnEdit:true },
    { key:'survey_year', label:'Survey Year', type:'text', required:true, disabledOnEdit:true },
  ],
});

const config: any = {
  apiEndpoint: '/api/athletic-sports',
  columns: athleticSportsColumns,
  modalComponent: AthleticSportsModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Athletic Sports',
    deleteConfirm: 'Are you sure you want to delete this Athletic Sports record?',
  },
};

export default function AthleticSportsPage() {
  return <CrudGridPage config={config} />;
}
