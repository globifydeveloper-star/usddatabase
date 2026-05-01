'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { Program } from '@/types/programs';
import { programColumns } from './config/program-column-config';
import EditProgramModal from './components/EditProgramsModal';

const programsConfig: CrudConfig<Program> = {
  apiEndpoint: '/api/programs',
  columns: programColumns as any,
  modalComponent: EditProgramModal,
  labels: {
    title: 'Programs Management',
    deleteConfirm: 'Are you sure you want to delete this program?',
  },
};

export default function ProgramsPage() {
  return <CrudGridPage config={programsConfig as any} />;
}
