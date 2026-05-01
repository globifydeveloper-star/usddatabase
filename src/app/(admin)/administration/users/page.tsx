'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { User } from '@/types/user';
import { userColumns } from './config/users-column-config';
import EditUserModal from './components/EditUserModal';

const usersConfig: CrudConfig<User> = {
  apiEndpoint: '/api/users',
  columns: userColumns as any,
  modalComponent: EditUserModal,
  labels: {
    title: 'Users Management',
    deleteConfirm: 'Are you sure you want to delete this user?',
  },
};

export default function UsersPage() {
  return <CrudGridPage config={usersConfig as any} />;
}