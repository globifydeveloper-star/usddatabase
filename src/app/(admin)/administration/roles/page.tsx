'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { CrudConfig } from '@/hooks/useCrudGrid';
import { Role } from '@/types/user';
import { rolesColumns } from './config/roles-column-config';
import EditRoleModal from './components/EditRoleModal';

const rolesConfig: CrudConfig<Role> = {
  apiEndpoint: '/api/roles',
  columns: rolesColumns as any,
  modalComponent: EditRoleModal,
  labels: {
    title: 'Roles Management',
    deleteConfirm: 'Are you sure you want to delete this role?',
  },
  getId: (item) => item.id,
};

export default function RolesPage() {
  return <CrudGridPage config={rolesConfig as any} />;
}
