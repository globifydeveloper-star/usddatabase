'use client';

import { useEffect, useState } from 'react';
import { Button, Dropdown, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

interface ActiveUserRow {
  user_id: number;
  email: string;
  role: string;
  login_at: string;
  device: string | null;
  ip_address: string | null;
}

const ActiveUsersPanel = () => {
  const currentUser = useCurrentUser();
  const [users, setUsers] = useState<ActiveUserRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [busyUserId, setBusyUserId] = useState<number | null>(null);

  const canView = currentUser?.role === 'superadmin';

  const fetchUsers = async () => {
    if (!canView) return;
    setLoading(true);
    try {
      const res = await fetch('/api/auth/active-users', { cache: 'no-store' });
      const result = await res.json();
      if (result.success) {
        setUsers(result.users || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!canView) return;
    fetchUsers();
    const interval = window.setInterval(fetchUsers, 15000);
    return () => window.clearInterval(interval);
  }, [canView]);

  const handleForceLogout = async (userId: number, email: string) => {
    setBusyUserId(userId);
    try {
      const res = await fetch(`/api/cms-users/${userId}/force-logout`, { method: 'POST' });
      const result = await res.json();
      if (!result.success) {
        toast.error(result.message || 'Unable to force logout');
        return;
      }
      toast.success(`${email} was signed out`);
      await fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error('Unable to force logout');
    } finally {
      setBusyUserId(null);
    }
  };

  if (!canView) return null;

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        as="a"
        className="topbar-link drop-arrow-none px-2"
        type="button"
        aria-haspopup="false"
        aria-expanded="false"
      >
        <span className="d-flex align-items-center gap-2">
          <IconifyIcon icon="ri:team-line" className="fs-18" />
          <span className="d-none d-lg-inline">{users.length}</span>
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-end" style={{ minWidth: 320 }}>
        <div className="px-3 py-2 border-bottom d-flex align-items-center justify-content-between">
          <strong>Active users</strong>
          <Button variant="link" size="sm" className="p-0" onClick={() => fetchUsers()}>
            Refresh
          </Button>
        </div>

        {loading && users.length === 0 ? (
          <div className="px-3 py-4 text-center text-muted">
            <Spinner animation="border" size="sm" className="me-2" />
            Loading...
          </div>
        ) : users.length === 0 ? (
          <div className="px-3 py-4 text-center text-muted">No active users right now.</div>
        ) : (
          <div className="px-2 py-2">
            {users.map((user) => (
              <div
                key={`${user.user_id}-${user.login_at}`}
                className="d-flex align-items-start justify-content-between gap-2 rounded px-2 py-2"
                style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
              >
                <div>
                  <div className="fw-semibold">{user.email}</div>
                  <div className="small text-muted">
                    {user.role} • {new Date(user.login_at).toLocaleString()}
                  </div>
                  {(user.device || user.ip_address) && (
                    <div className="small text-muted">
                      {user.device || 'Unknown device'}
                      {user.ip_address ? ` • ${user.ip_address}` : ''}
                    </div>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleForceLogout(user.user_id, user.email)}
                  disabled={busyUserId === user.user_id}
                >
                  {busyUserId === user.user_id ? <Spinner animation="border" size="sm" /> : 'Logout'}
                </Button>
              </div>
            ))}
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ActiveUsersPanel;
