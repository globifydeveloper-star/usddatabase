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
  {
    id: 'action',
    name: 'Action',
    sort: false,
    width: '110px',
    formatter: (cell: any) => {
      const rowData = cell;

      const editIcon = h('span', {
        style: {
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          color: '#a8e7e7ff',
        },
        onClick: () =>
          window.dispatchEvent(
            new CustomEvent('openEditModal', { detail: rowData })
          ),
        innerHTML:
          '<iconify-icon icon="ri:edit-line" width="20" height="20"></iconify-icon>',
      });

      const deleteIcon = h('span', {
        style: {
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          color: '#ef4444',
        },
        onClick: () =>
          window.dispatchEvent(
            new CustomEvent('deleteStudent', { detail: rowData })
          ),
        innerHTML:
          '<iconify-icon icon="ri:delete-bin-line" width="20" height="20"></iconify-icon>',
      });

      return h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
          },
        },
        [editIcon, deleteIcon]
      );
    },
  },
];