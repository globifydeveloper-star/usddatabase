'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CrudGridPage } from '@/components/CrudGridPage';
import AccessDeniedAlert from '@/components/AccessDeniedAlert';
import { useCurrentUser } from '@/hooks/useCurrentUser';
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
  allowAddForRoles: ['superadmin', 'editor'],
  labels: {
    title: 'CMS Users',
    deleteConfirm: 'This will permanently delete the user account. This cannot be undone.',
  },
};

function CmsUsersContent() {
  const currentUser = useCurrentUser();
  const searchParams = useSearchParams();

  useEffect(() => {
    const editUserId = searchParams.get('editUserId');
    const forceLoggedOut = searchParams.get('forceLoggedOut') === 'true';

    if (editUserId) {
      fetch('/api/cms-users?limit=100')
        .then((r) => r.json())
        .then((res) => {
          if (res?.data && Array.isArray(res.data)) {
            const targetUser = res.data.find((u: any) => String(u.id) === String(editUserId));
            if (targetUser) {
              window.dispatchEvent(
                new CustomEvent('gridEdit', {
                  detail: { ...targetUser, justForceLoggedOut: forceLoggedOut },
                })
              );
            }
          }
        })
        .catch(console.error);
    }
  }, [searchParams]);

  if (currentUser?.role === 'viewer') return <AccessDeniedAlert />;
  return <CrudGridPage config={config} />;
}

export default function CmsUsersPage() {
  return (
    <Suspense fallback={<div className="p-3">Loading CMS Users...</div>}>
      <CmsUsersContent />
    </Suspense>
  );
}
