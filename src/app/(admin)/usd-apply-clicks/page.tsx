'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { usdApplyClicksColumns } from './config/usd-apply-clicks-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const UsdApplyClicksModal = makeCrudModal({
  title: 'Apply Clicks',
  apiEndpoint: '/api/usd-apply-clicks',
  buildItemPath,
  fields: [
    { key:'user_id', label:'User Id', type:'number', required:true },
    { key:'university_id', label:'University Id', type:'text' },
    { key:'university_name', label:'University Name', type:'text' },
    { key:'cip_code', label:'Cip Code', type:'text' },
    { key:'degree', label:'Degree', type:'text' },
    { key:'credential_level', label:'Credential Level', type:'number' },
    { key:'credential_title', label:'Credential Title', type:'text' },
    { key:'school_url', label:'School Url', type:'text', full:true },
    { key:'clicked_at', label:'Clicked At', type:'datetime' },
  ],
});

const config: any = {
  apiEndpoint: '/api/usd-apply-clicks',
  columns: usdApplyClicksColumns,
  modalComponent: UsdApplyClicksModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Apply Clicks',
    deleteConfirm: 'Are you sure you want to delete this Apply Clicks record?',
  },
};

export default function UsdApplyClicksPage() {
  return <CrudGridPage config={config} />;
}
