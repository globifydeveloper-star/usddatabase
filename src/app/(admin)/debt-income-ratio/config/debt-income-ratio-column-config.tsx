'use client';

import { h } from 'gridjs';

export const studentColumns = [
  { id: 'unitid', name: 'Unit ID', sort: true, width: '100px' },
  { id: 'avg_debt', name: 'Avg Debt', sort: true, width: '140px' },
  { id: 'avg_income', name: 'Avg Income', sort: true, width: '140px' },
  { id: 'debt_income_ratio', name: 'Debt Income Ratio', sort: true, width: '170px' },
  { id: 'ratio_text', name: 'Ratio Text', sort: true, width: '200px' },
];
