'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import CmsUserFormModal from './components/CmsUserFormModal';
import { cmsUsersColumns } from './config/cms-users-column-config';

const buildItemPath = (item: any) => ['id'].map((k) => encodeURIComponent(item?.[k])).join('~');

const config: any = {
  apiEndpoint: '/api/cms-users',
  columns: cmsUsersColumns,
  modalComponent: CmsUserFormModal,
  buildItemPath,
  showActions: true,
  showDeleteAction: true,
  labels: {
    title: 'CMS Users',
    deleteConfirm: 'This will permanently delete the user account. This cannot be undone.',
  },
};

export default function CmsUsersPage() {
  return <CrudGridPage config={config} />;
}
