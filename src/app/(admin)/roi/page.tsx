'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { Roi } from '../../../types/roi';
import { roiColumns } from './config/roi-column-config';
import EditRoiModal from './components/EditRoiModal';

const roiConfig: CrudConfig<Roi> = {
  apiEndpoint: '/api/roi',
  columns: roiColumns as any,
  modalComponent: EditRoiModal,
  labels: {
    title: 'ROI Management',
    deleteConfirm: 'Are you sure you want to delete this ROI record?',
  },
};

export default function RoiPage() {
  return <CrudGridPage config={roiConfig as any} />;
}
