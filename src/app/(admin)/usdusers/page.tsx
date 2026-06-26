'use client';

import React from 'react';
import { CrudGridPage } from '@/components/CrudGridPage';
import { makeCrudModal } from '@/components/crud/CrudFormModal';
import { usdusersColumns } from './config/usdusers-column-config';

const buildItemPath = (item:any)=> ['id'].map(k=>encodeURIComponent(item?.[k])).join('~');

const UsdusersModal = makeCrudModal({
  title: 'Usdusers',
  apiEndpoint: '/api/usdusers',
  buildItemPath,
  fields: [
    { key:'display_name', label:'Display Name', type:'text', required:true },
    { key:'email', label:'Email', type:'text', required:true },
    { key:'profile_image', label:'Profile Image', type:'text' },
    { key:'auth_provider', label:'Auth Provider', type:'text', required:true },
    { key:'role', label:'Role', type:'text' },
    { key:'email_verified', label:'Email Verified', type:'switch' },
    { key:'provider_user_id', label:'Provider User Id', type:'text' },
    { key:'last_login', label:'Last Login', type:'datetime' },
    { key:'password_hash', label:'Password Hash', type:'text' },
    { key:'is_active', label:'Is Active', type:'switch' },
    { key:'deactivated_at', label:'Deactivated At', type:'datetime' },
    { key:'firebase_uid', label:'Firebase Uid', type:'text' },
    { key:'phone', label:'Phone', type:'text' },
    { key:'address', label:'Address', type:'textarea' },
    { key:'gpa', label:'Gpa', type:'number' },
    { key:'sat_math', label:'Sat Math', type:'number' },
    { key:'sat_reading_writing', label:'Sat Reading Writing', type:'number' },
    { key:'act_score', label:'Act Score', type:'number' },
    { key:'graduation_year', label:'Graduation Year', type:'number' },
    { key:'high_school_name', label:'High School Name', type:'text' },
    { key:'preferred_degree_level', label:'Preferred Degree Level', type:'text' },
  ],
});

const config: any = {
  apiEndpoint: '/api/usdusers',
  columns: usdusersColumns,
  modalComponent: UsdusersModal,
  buildItemPath,
  showActions: true,
  labels: {
    title: 'Usdusers',
    deleteConfirm: 'Are you sure you want to delete this Usdusers record?',
  },
};

export default function UsdusersPage() {
  return <CrudGridPage config={config} />;
}
