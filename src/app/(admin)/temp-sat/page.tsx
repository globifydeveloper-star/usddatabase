'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { tempSatColumns } from './config/temp-sat-column-config';

const buildItemPath = (item:any)=> ['unitid'].map(k=>encodeURIComponent(item?.[k])).join('~');

const TempSatModal = makeCrudModal({
  title: 'Temp Sat',
  apiEndpoint: '/api/temp-sat',
  buildItemPath,
  fields: [
    { key:'unitid', label:'Unitid', type:'fk-school', disabledOnEdit:true },
    { key:'sat_avg_overall', label:'Sat Avg Overall', type:'number' },
    { key:'sat_mid_math', label:'Sat Mid Math', type:'number' },
    { key:'sat_mid_reading', label:'Sat Mid Reading', type:'number' },
    { key:'sat_p25_reading', label:'Sat P25 Reading', type:'number' },
    { key:'sat_p25_math', label:'Sat P25 Math', type:'number' },
    { key:'sat_p25_writing', label:'Sat P25 Writing', type:'number' },
    { key:'sat_p75_reading', label:'Sat P75 Reading', type:'number' },
    { key:'sat_p75_math', label:'Sat P75 Math', type:'number' },
    { key:'sat_p75_writing', label:'Sat P75 Writing', type:'number' },
  ],
});

const config: any = {
  apiEndpoint: '/api/temp-sat',
  columns: tempSatColumns,
  modalComponent: TempSatModal,
  buildItemPath,
  showActions: false,
  labels: {
    title: 'Temp Sat',
    deleteConfirm: 'Are you sure you want to delete this Temp Sat record?',
  },
};

export default function TempSatPage() {
  return <CrudGridPage config={config} />;
}
