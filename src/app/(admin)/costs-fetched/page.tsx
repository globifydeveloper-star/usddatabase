'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { costsFetchedColumns } from './config/costs-fetched-column-config';

const buildItemPath = (item:any)=> ['unitid'].map(k=>encodeURIComponent(item?.[k])).join('~');

const CostsFetchedModal = makeCrudModal({
  title: 'Costs Fetched',
  apiEndpoint: '/api/costs-fetched',
  buildItemPath,
  fields: [
    { key:'unitid', label:'Unitid', type:'fk-school', required:true, disabledOnEdit:true },
    { key:'booksupply', label:'Booksupply', type:'number' },
    { key:'tuition_in_state', label:'Tuition In State', type:'number' },
    { key:'tuition_out_state', label:'Tuition Out State', type:'number' },
    { key:'tuition_program_year', label:'Tuition Program Year', type:'number' },
    { key:'roomboard_oncampus', label:'Roomboard Oncampus', type:'number' },
    { key:'roomboard_offcampus', label:'Roomboard Offcampus', type:'number' },
    { key:'avg_net_price_public', label:'Avg Net Price Public', type:'number' },
    { key:'avg_net_price_private', label:'Avg Net Price Private', type:'number' },
    { key:'avg_net_price_overall', label:'Avg Net Price Overall', type:'number' },
    { key:'otherexpense_oncampus', label:'Otherexpense Oncampus', type:'number' },
    { key:'otherexpense_offcampus', label:'Otherexpense Offcampus', type:'number' },
    { key:'otherexpense_withfamily', label:'Otherexpense Withfamily', type:'number' },
    { key:'sticker_price', label:'Sticker Price', type:'number' },
  ],
});

const config: any = {
  apiEndpoint: '/api/costs-fetched',
  columns: costsFetchedColumns,
  modalComponent: CostsFetchedModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Costs Fetched',
    deleteConfirm: 'Are you sure you want to delete this Costs Fetched record?',
  },
};

export default function CostsFetchedPage() {
  return <CrudGridPage config={config} />;
}
