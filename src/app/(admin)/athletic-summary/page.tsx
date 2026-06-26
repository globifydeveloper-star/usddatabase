'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { athleticSummaryColumns } from './config/athletic-summary-column-config';

const buildItemPath = (item:any)=> ['unitid','survey_year','division'].map(k=>encodeURIComponent(item?.[k])).join('~');

const AthleticSummaryModal = makeCrudModal({
  title: 'Athletic Summary',
  apiEndpoint: '/api/athletic-summary',
  buildItemPath,
  fields: [
    { key:'unitid', label:'Unitid', type:'fk-school', required:true, disabledOnEdit:true },
    { key:'survey_year', label:'Survey Year', type:'text', required:true, disabledOnEdit:true },
    { key:'division', label:'Division', type:'text', required:true, disabledOnEdit:true },
    { key:'athletic_aid_total', label:'Athletic Aid Total', type:'text' },
    { key:'athletes_total', label:'Athletes Total', type:'text' },
    { key:'avg_aid_per_athlete', label:'Avg Aid Per Athlete', type:'text' },
    { key:'recruiting_expense', label:'Recruiting Expense', type:'text' },
    { key:'athletic_revenue', label:'Athletic Revenue', type:'text' },
    { key:'athletic_expense', label:'Athletic Expense', type:'text' },
  ],
});

const config: any = {
  apiEndpoint: '/api/athletic-summary',
  columns: athleticSummaryColumns,
  modalComponent: AthleticSummaryModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Athletic Summary',
    deleteConfirm: 'Are you sure you want to delete this Athletic Summary record?',
  },
};

export default function AthleticSummaryPage() {
  return <CrudGridPage config={config} />;
}
