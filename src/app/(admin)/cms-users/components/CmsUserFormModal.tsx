'use client';

import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

export interface CmsUser {
  id: number;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  justForceLoggedOut?: boolean;
}

interface Props {
  show: boolean;
  onClose: () => void;
  data: CmsUser | null;
  onSuccess: () => void;
}

const CmsUserFormModal = ({ show, onClose, data, onSuccess }: Props) => {
  const isEdit = !!data;
  const currentUser = useCurrentUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<string>('viewer');
  const [roleOptions, setRoleOptions] = useState<{ value: string; label: string }[]>([
    { value: 'superadmin', label: 'Superadmin' },
    { value: 'editor', label: 'Admin' },
    { value: 'viewer', label: 'Viewer' },
  ]);
  const [isActive, setIsActive] = useState(true);
  const [justForceLoggedOut, setJustForceLoggedOut] = useState(false);
  const [availableTables, setAvailableTables] = useState<string[]>([]);
  const [grantedTables, setGrantedTables] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [forceLogoutLoading, setForceLogoutLoading] = useState(false);

  // Non-superadmins (i.e. editors/"Admins") reach this modal only via the
  // Add button, and may only ever create viewer accounts. When editing an
  // existing user, they can only change the active state for viewer accounts.
  const isRestrictedActor = currentUser != null && currentUser.role !== 'superadmin';
  const canManageActiveStatus = !isRestrictedActor || !data || data.role === 'viewer';

  // Any role beyond superadmin/viewer — the built-in "editor" role as well
  // as any custom role added via Administration > Roles — gets table-level
  // permissions, assignable in this same form at creation time.
  const isPermissionableRole = role !== 'superadmin' && role !== 'viewer';

  // UI-only for now — not persisted or enforced anywhere yet.
  const [userManagementPerms, setUserManagementPerms] = useState<string[]>([]);
  const [securityPerms, setSecurityPerms] = useState<string[]>([]);

  const toggleIn = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  useEffect(() => {
    if (!show) return;
    setEmail(data?.email ?? '');
    setPassword('');
    setShowPassword(false);
    setRole(isRestrictedActor ? 'viewer' : (data?.role ?? 'viewer'));
    setIsActive(data?.is_active ?? true);
    setJustForceLoggedOut(!!data?.justForceLoggedOut);
    setGrantedTables([]);
    setUserManagementPerms([]);
    setSecurityPerms([]);

    const defaultOptions = [
      { value: 'superadmin', label: 'Superadmin' },
      { value: 'editor', label: 'Admin' },
      { value: 'viewer', label: 'Viewer' },
    ];

    fetch('/api/roles/all')
      .then((r) => r.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          const list: { id?: number; role_name: string }[] = res.data;
          const merged: { value: string; label: string }[] = [...defaultOptions];

          list.forEach((r) => {
            const rawName = r.role_name ? r.role_name.trim() : '';
            if (!rawName) return;
            const norm = rawName.toLowerCase().replace(/[\s_]+/g, '');
            if (
              norm !== 'superadmin' &&
              norm !== 'editor' &&
              norm !== 'admin' &&
              norm !== 'viewer'
            ) {
              const val = rawName.toLowerCase().replace(/\s+/g, '_');
              if (!merged.some((item) => item.value === val)) {
                merged.push({ value: val, label: rawName });
              }
            }
          });
          setRoleOptions(merged);
        } else {
          setRoleOptions(defaultOptions);
        }
      })
      .catch(() => setRoleOptions(defaultOptions));

    fetch('/api/cms-users/available-tables')
      .then((r) => r.json())
      .then((res) => {
        const tables: string[] = res.tables ?? [];
        setAvailableTables(tables.filter((t) => t !== 'audit_logs'));
      })
      .catch(() => setAvailableTables([]));

    if (data && data.role !== 'superadmin' && data.role !== 'viewer') {
      fetch(`/api/cms-users/permissions?editor_user_id=${data.id}`)
        .then((r) => r.json())
        .then((res) => {
          const permissionTables: string[] = res.tableNames ?? [];
          setGrantedTables(permissionTables.filter((t) => t !== 'audit_logs'));
          setSecurityPerms(permissionTables.includes('audit_logs') ? ['audit_logs'] : []);
        })
        .catch(() => {
          setGrantedTables([]);
          setSecurityPerms([]);
        });
    }
  }, [show, data, isRestrictedActor]);

  const toggleTable = (table: string) => {
    setGrantedTables((prev) =>
      prev.includes(table) ? prev.filter((t) => t !== table) : [...prev, table]
    );
  };

  const handleForceLogout = async () => {
    if (!data) return;

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

    try {
      setForceLogoutLoading(true);
      const res = await fetch(`/api/cms-users/${data.id}/force-logout`, { method: 'POST' });
      const result = await res.json();

      if (!result.success) {
        await Swal.fire({
          title: 'Cannot Force Logout',
          text: result.message || 'Something went wrong',
          icon: 'warning',
          confirmButtonColor: '#f59e0b',
          confirmButtonText: 'Ok, got it!',
        });
        return;
      }
      toast.success('User has been logged out successfully.');
      setJustForceLoggedOut(true);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setForceLogoutLoading(false);
    }
  };

  const handleSave = async () => {
    if (!email) {
      toast.error('Email is required');
      return;
    }
    if (!isEdit && !password) {
      toast.error('Password is required');
      return;
    }

    try {
      setLoading(true);

      const url = isEdit ? `/api/cms-users/${data!.id}` : '/api/cms-users';
      const method = isEdit ? 'PUT' : 'POST';
      const body: Record<string, any> = isEdit
        ? { role, is_active: isActive, ...(password ? { password } : {}) }
        : { email, password, role, is_active: isActive };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await res.json();

      if (!result.success) {
        toast.error(result.message || 'Save failed');
        return;
      }

      const editorUserId = isEdit ? data!.id : result.data.id;
      if (isPermissionableRole && currentUser?.role === 'superadmin') {
        const effectiveTableNames = [
          ...new Set([
            ...grantedTables.filter((t) => t !== 'audit_logs'),
            ...(securityPerms.includes('audit_logs') ? ['audit_logs'] : []),
          ]),
        ];

        const permRes = await fetch('/api/cms-users/permissions', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ editor_user_id: editorUserId, tableNames: effectiveTableNames }),
        });
        const permResult = await permRes.json();
        if (!permResult.success) {
          toast.error(permResult.message || 'Failed to save table permissions');
          return;
        }
      }

      toast.success(isEdit ? 'Updated successfully' : 'Created successfully');
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit' : 'Add'} CMS User</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Email <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  disabled={isEdit}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Password {!isEdit && <span className="text-danger">*</span>}
                </Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder={isEdit ? 'Leave blank to keep unchanged' : ''}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      fontSize: '20px',
                      color: '#6c757d',
                      display: 'flex',
                      alignItems: 'center',
                      zIndex: 5,
                    }}
                  >
                    <IconifyIcon
                      icon={showPassword ? 'ri:eye-off-line' : 'ri:eye-line'}
                      width="20"
                      height="20"
                    />
                  </span>
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                {isRestrictedActor ? (
                  <>
                    <Form.Control value="Viewer" disabled />
                    <div className="text-muted small mt-1">Admins can only create viewer accounts.</div>
                  </>
                ) : (
                  <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                    {roleOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Form.Select>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Is Active</Form.Label>
                <Form.Check
                  type="switch"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  label={isActive ? 'Yes' : 'No'}
                  disabled={!canManageActiveStatus}
                />
                {justForceLoggedOut && (
                  <div className="text-warning fw-semibold small mt-1 d-flex align-items-center gap-1">
                    <span>⚠️</span> <strong>Warning:</strong> Disable this account and change the PASSWORD. Otherwise, the user may be able to log in again.
                  </div>
                )}
                {!canManageActiveStatus && (
                  <div className="text-muted small mt-1">
                    Admins can only change the active status for viewer accounts.
                  </div>
                )}
              </Form.Group>
            </Col>

            {isPermissionableRole && (
              <Col md={12}>
                <hr className="mt-1 mb-3" />

                {/* 1. Content Management */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">1. Content Management</Form.Label>
                  <div className="text-muted small mb-2">
                    Enables all action buttons (add / edit / delete) for the selected tables.
                  </div>
                  <div className="border rounded p-2" style={{ maxHeight: 260, overflowY: 'auto' }}>
                    <Row>
                      <Col md={4}>
                        <Form.Check
                          type="checkbox"
                          id="table-select-all"
                          label="Select All"
                          className="fw-semibold"
                          checked={
                            availableTables.length > 0 &&
                            grantedTables.length === availableTables.length
                          }
                          onChange={(e) =>
                            setGrantedTables(e.target.checked ? [...availableTables] : [])
                          }
                        />
                      </Col>
                    </Row>
                    <hr className="my-2" />
                    <Row>
                      {availableTables.map((table) => (
                        <Col md={4} key={table}>
                          <Form.Check
                            type="checkbox"
                            id={`table-${table}`}
                            label={table}
                            checked={grantedTables.includes(table)}
                            onChange={() => toggleTable(table)}
                          />
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Form.Group>

                {/* 2. User Management */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">2. User Management</Form.Label>
                  <div className="text-muted small mb-2">
                    Not yet enforced — coming soon.
                  </div>
                  <div className="border rounded p-2">
                    <Form.Check
                      type="checkbox"
                      id="perm-disable-accounts"
                      label="Disable user accounts"
                      checked={userManagementPerms.includes('disable_accounts')}
                      onChange={() =>
                        toggleIn(userManagementPerms, setUserManagementPerms, 'disable_accounts')
                      }
                    />
                    <Form.Check
                      type="checkbox"
                      id="perm-reset-passwords"
                      label="Reset passwords"
                      checked={userManagementPerms.includes('reset_passwords')}
                      onChange={() =>
                        toggleIn(userManagementPerms, setUserManagementPerms, 'reset_passwords')
                      }
                    />
                  </div>
                </Form.Group>

                {/* 3. Security */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">3. Security</Form.Label>
                  <div className="text-muted small mb-2">
                    Not yet enforced — coming soon.
                  </div>
                  <div className="border rounded p-2">
                    <Form.Check
                      type="checkbox"
                      id="perm-login-history"
                      label="View login history"
                      checked={securityPerms.includes('login_history')}
                      onChange={() => toggleIn(securityPerms, setSecurityPerms, 'login_history')}
                    />
                    <Form.Check
                      type="checkbox"
                      id="perm-audit-logs"
                      label="Audit logs"
                      checked={securityPerms.includes('audit_logs')}
                      onChange={() => toggleIn(securityPerms, setSecurityPerms, 'audit_logs')}
                    />
                    <Form.Check
                      type="checkbox"
                      id="perm-force-logout"
                      label="Force logout users"
                      checked={securityPerms.includes('force_logout')}
                      onChange={() => toggleIn(securityPerms, setSecurityPerms, 'force_logout')}
                    />
                  </div>
                </Form.Group>
              </Col>
            )}
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        {isEdit &&
          currentUser?.role === 'superadmin' &&
          data?.role !== 'superadmin' &&
          data?.id !== currentUser.userId && (
            <Button
              variant="outline-warning"
              className="me-auto"
              onClick={handleForceLogout}
              disabled={forceLogoutLoading}
            >
              {forceLogoutLoading ? 'Logging out...' : 'Force Logout'}
            </Button>
          )}
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CmsUserFormModal;
