'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
import { useCurrentUser } from '@/hooks/useCurrentUser';

type LoginHistoryEntry = {
  id: number;
  email: string;
  role: string;
  login_at: string;
  logout_at: string | null;
  session_duration: string | null;
  device: string | null;
  ip_address: string | null;
};

const roleBadgeColor: Record<string, string> = {
  superadmin: 'danger',
  editor: 'primary',
  viewer: 'info',
};

const RecentLoginHistory = () => {
  const currentUser = useCurrentUser();
  const [effectiveUser, setEffectiveUser] = useState(currentUser);
  const [history, setHistory] = useState<LoginHistoryEntry[]>([]);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (!res.ok) {
        setEffectiveUser(null);
        return;
      }
      setEffectiveUser(await res.json());
    } catch {
      setEffectiveUser(null);
    }
  }, []);

  useEffect(() => {
    setEffectiveUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    void refreshUser();
    const handleFocus = () => {
      void refreshUser();
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, [refreshUser]);

  const canViewLoginHistory =
    effectiveUser?.role === 'superadmin' ||
    (effectiveUser?.role === 'editor' && effectiveUser?.permittedTables?.includes('login_history'));

  useEffect(() => {
    if (!canViewLoginHistory) {
      setHistory([]);
      return;
    }

    fetch('/api/cms-login-history?page=1&limit=6')
      .then((r) => (r.ok ? r.json() : { data: [] }))
      .then((res) => setHistory(res.data ?? []))
      .catch(() => setHistory([]));
  }, [canViewLoginHistory]);

  if (!canViewLoginHistory) return null;

  return (
    <Card className="h-100">
      <CardHeader className="d-flex align-items-center justify-content-between">
        <CardTitle as="h4" className="mb-0">
          Recent Login History
        </CardTitle>
        <Link href="/login-history" className="fs-13 fw-semibold">
          View All
        </Link>
      </CardHeader>
      <CardBody className="pt-0">
        {history.length === 0 ? (
          <p className="text-muted mb-0">No login history recorded yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-sm table-borderless mb-0">
              <tbody>
                {history.map((item) => (
                  <tr key={item.id}>
                    <td className="ps-0">
                      <div className="fw-semibold">{item.email}</div>
                      <div className="text-muted fs-12">
                        <span
                          className={`badge bg-${roleBadgeColor[item.role] || 'secondary'}-subtle text-${roleBadgeColor[item.role] || 'secondary'} me-2`}
                        >
                          {item.role === 'editor' ? 'Admin' : item.role}
                        </span>
                        {item.ip_address && <span className="me-2">{item.ip_address}</span>}
                        {item.device && <span>{item.device}</span>}
                      </div>
                    </td>
                    <td className="text-muted fs-12 text-end pe-0 align-middle">
                      {new Date(item.login_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default RecentLoginHistory;
