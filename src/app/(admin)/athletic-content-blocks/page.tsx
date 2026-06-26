'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { athleticContentBlocksColumns } from './config/athletic-content-blocks-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const AthleticContentBlocksModal = makeCrudModal({
  title: 'Athletic Content Blocks',
  apiEndpoint: '/api/athletic-content-blocks',
  buildItemPath,
  fields: [
    { key:'key', label:'Key', type:'text', required:true },
    { key:'title', label:'Title', type:'text', required:true },
    { key:'content', label:'Content', type:'textarea', required:true },
  ],
});

const config: any = {
  apiEndpoint: '/api/athletic-content-blocks',
  columns: athleticContentBlocksColumns,
  modalComponent: AthleticContentBlocksModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Athletic Content Blocks',
    deleteConfirm: 'Are you sure you want to delete this Athletic Content Blocks record?',
  },
};

export default function AthleticContentBlocksPage() {
  return <CrudGridPage config={config} />;
}
