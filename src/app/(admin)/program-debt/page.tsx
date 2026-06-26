'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { programDebtColumns } from './config/program-debt-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const ProgramDebtModal = makeCrudModal({
  title: 'Program Debt',
  apiEndpoint: '/api/program-debt',
  buildItemPath,
  fields: [
    { key:'program_id', label:'Program Id', type:'fk-program', required:true },
    { key:'loan_type', label:'Loan Type', type:'text', required:true },
    { key:'group_type', label:'Group Type', type:'text', required:true },
    { key:'institution_scope', label:'Institution Scope', type:'text', required:true },
    { key:'borrower_count', label:'Borrower Count', type:'number' },
    { key:'median_debt', label:'Median Debt', type:'number' },
    { key:'average_debt', label:'Average Debt', type:'number' },
    { key:'median_payment', label:'Median Payment', type:'number' },
  ],
});

const config: any = {
  apiEndpoint: '/api/program-debt',
  columns: programDebtColumns,
  modalComponent: ProgramDebtModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Program Debt',
    deleteConfirm: 'Are you sure you want to delete this Program Debt record?',
  },
};

export default function ProgramDebtPage() {
  return <CrudGridPage config={config} />;
}
