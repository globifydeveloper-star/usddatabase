'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Dropdown, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

interface ActiveUserRow {
  user_id: number;
  email: string;
  role: string;
  login_at: string;
  last_seen_at?: string;
  device: string | null;
  ip_address: string | null;
}

const ActiveUsersPanel = () => {
  const router = useRouter();
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
    const confirmResult = await Swal.fire({
      title: 'Force Logout User?',
      text: 'This user will be signed out immediately and must log in again.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f59e0b',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Force Logout',
      cancelButtonText: 'Cancel',
    });
    if (!confirmResult.isConfirmed) return;

    setBusyUserId(userId);
    try {
      const res = await fetch(`/api/cms-users/${userId}/force-logout`, { method: 'POST' });
      const result = await res.json();
      if (!result.success) {
        toast.error(result.message || 'Unable to force logout');
        return;
      }
      toast.success('User has been logged out successfully.');
      await fetchUsers();
      router.push(`/cms-users?editUserId=${userId}&forceLoggedOut=true`);
    } catch (error) {
      console.error(error);
      toast.error('Unable to force logout');
    } finally {
      setBusyUserId(null);
    }
  };

  if (!canView) return null;

  const roleBadgeVariant: Record<string, string> = {
    superadmin: 'danger',
    editor: 'primary',
    viewer: 'secondary',
  };

  const timeAgo = (iso?: string) => {
    if (!iso) return 'just now';
    const diffMs = Date.now() - new Date(iso).getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return 'active now';
    if (minutes < 60) return `active ${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `active ${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `active ${days}d ago`;
  };

  const initials = (email: string) => email.slice(0, 2).toUpperCase();

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

      <Dropdown.Menu className="dropdown-menu-end p-0" style={{ width: 340, maxWidth: 'calc(100vw - 32px)' }}>
        <div className="px-3 py-2 border-bottom d-flex align-items-center justify-content-between">
          <strong className="fs-14">Active sessions ({users.length})</strong>
          <Button
            variant="link"
            size="sm"
            className="p-0 text-decoration-none"
            onClick={() => fetchUsers()}
            title="Refresh"
          >
            <IconifyIcon icon="ri:refresh-line" className={loading ? 'spin-icon' : ''} />
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
          <div style={{ maxHeight: 360, overflowY: 'auto' }}>
            {users.map((user) => (
              <div
                key={`${user.user_id}-${user.login_at}`}
                className="d-flex align-items-center gap-2 px-3 py-2 border-bottom"
              >
                <div className="position-relative flex-shrink-0">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-light text-muted fw-semibold"
                    style={{ width: 36, height: 36, fontSize: 13 }}
                  >
                    {initials(user.email)}
                  </div>
                  <span
                    className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle"
                    style={{ width: 10, height: 10 }}
                    title="Online"
                  />
                </div>

                <div className="flex-grow-1 min-w-0">
                  <div className="d-flex align-items-center gap-1">
                    <span className="fw-semibold text-truncate" style={{ maxWidth: 160 }} title={user.email}>
                      {user.email}
                    </span>
                    <span className={`badge bg-${roleBadgeVariant[user.role] ?? 'secondary'} bg-opacity-10 text-${roleBadgeVariant[user.role] ?? 'secondary'} fs-11`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="small text-muted text-truncate" title={`${user.device || 'Unknown device'}${user.ip_address ? ` • ${user.ip_address}` : ''}`}>
                    {timeAgo(user.last_seen_at || user.login_at)}
                    {user.ip_address ? ` • ${user.ip_address}` : ''}
                  </div>
                </div>

                {user.role !== 'superadmin' && user.user_id !== currentUser?.userId ? (
                  <Button
                    size="sm"
                    variant="outline-danger"
                    className="flex-shrink-0"
                    onClick={() => handleForceLogout(user.user_id, user.email)}
                    disabled={busyUserId === user.user_id}
                    title="Force logout"
                  >
                    {busyUserId === user.user_id ? <Spinner animation="border" size="sm" /> : <IconifyIcon icon="ri:logout-box-line" />}
                  </Button>
                ) : (
                  <span style={{ width: 32 }} />
                )}
              </div>
            ))}
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ActiveUsersPanel;
