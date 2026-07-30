'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
import { useCurrentUser } from '@/hooks/useCurrentUser';

type AuditLogEntry = {
  id: number;
  email: string;
  table_name: string;
  action: string;
  created_at: string;
};

const actionBadgeColor: Record<string, string> = {
  create: 'success',
  update: 'primary',
  delete: 'danger',
  permission_change: 'warning',
  force_logout: 'warning',
};

const RecentAuditLogs = () => {
  const user = useCurrentUser();
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);

  useEffect(() => {
    if (user?.role !== 'superadmin') return;
    fetch('/api/cms-audit-logs?page=1&limit=6')
      .then((r) => (r.ok ? r.json() : { data: [] }))
      .then((res) => setLogs(res.data ?? []))
      .catch(() => setLogs([]));
  }, [user?.role]);

  if (user?.role !== 'superadmin') return null;

  return (
    <Card className="h-100">
      <CardHeader className="d-flex align-items-center justify-content-between">
        <CardTitle as="h4" className="mb-0">
          Recent Audit Logs
        </CardTitle>
        <Link href="/cms-audit-logs" className="fs-13 fw-semibold">
          View All
        </Link>
      </CardHeader>
      <CardBody className="pt-0">
        {logs.length === 0 ? (
          <p className="text-muted mb-0">No activity recorded yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-sm table-borderless mb-0">
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td className="ps-0">
                      <div className="fw-semibold">{log.email}</div>
                      <div className="text-muted fs-12">
                        {log.table_name}
                        <span
                          className={`badge bg-${actionBadgeColor[log.action] || 'secondary'}-subtle text-${actionBadgeColor[log.action] || 'secondary'} ms-2`}
                        >
                          {log.action}
                        </span>
                      </div>
                    </td>
                    <td className="text-muted fs-12 text-end pe-0 align-middle">
                      {new Date(log.created_at).toLocaleString()}
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

export default RecentAuditLogs;
