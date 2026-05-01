'use client';

import { h } from 'gridjs';

export const studentColumns = [
  { id: 'unitid', name: 'Unit ID', sort: true, width: '110px' },

  { id: 'size', name: 'Size', sort: true, width: '90px' },

  { id: 'grad_students', name: 'Grad Students', sort: true, width: '150px' },

  {
    id: 'enrollment_grad_12_month',
    name: 'Grad 12 Month',
    sort: true,
    width: '150px',
  },

  {
    id: 'enrollment_undergrad_12_month',
    name: 'Undergrad 12 Month',
    sort: true,
    width: '170px',
  },

  {
    id: 'fafsa_applications',
    name: 'FAFSA Applications',
    sort: true,
    width: '170px',
  },

  {
    id: 'demographics_men',
    name: 'Demo Men',
    sort: true,
    width: '120px',
    
  },

  {
    id: 'demographics_women',
    name: 'Demo Women',
    sort: true,
    width: '120px',
    
  },

  {
    id: 'faculty_men',
    name: 'Faculty Men',
    sort: true,
    width: '120px',
    
  },

  {
    id: 'faculty_women',
    name: 'Faculty Women',
    sort: true,
    width: '120px',
    
  },
  {
    id: 'student_faculty_ratio',
    name: 'Student-Faculty Ratio',
    sort: true,
    width: '180px',
  },
];