'use client';

export const loginHistoryColumns = [
  { id: 'email', name: 'User', sort: true },
  { id: 'role', name: 'Role', sort: true },
  { id: 'session_duration', name: 'Session Duration', sort: false },
  { id: 'login_at', name: 'Login Time', sort: true },
  { id: 'logout_at', name: 'Logout Time', sort: true },
  { id: 'device', name: 'Device', sort: false },
  { id: 'ip_address', name: 'IP', sort: true },
];
