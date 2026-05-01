'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { Completion } from '@/types/completion';
import { studentColumns } from './config/completion-column-config';
import EditCompletionModal from './components/EditCompletionModal';

const completionConfig: CrudConfig<Completion> = {
  apiEndpoint: '/api/completion',
  columns: studentColumns as any,
  modalComponent: EditCompletionModal,
  labels: {
    title: 'Completion Management',
    deleteConfirm: 'Are you sure you want to delete this completion record?',
  },
};

export default function CompletionPage() {
  return <CrudGridPage config={completionConfig as any} />;
}