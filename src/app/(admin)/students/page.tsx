'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { Student } from '@/types/student';
import { studentColumns } from './config/student-column-config';
import EditStudentsModal from './components/EditStudentsModal';

const studentsConfig: CrudConfig<Student> = {
  apiEndpoint: '/api/students',
  columns: studentColumns as any,
  modalComponent: EditStudentsModal,
  labels: {
    title: 'Students Management',
    deleteConfirm: 'Are you sure you want to delete this student record?',
  },
};

export default function StudentsPage() {
  return <CrudGridPage config={studentsConfig as any} />;
}