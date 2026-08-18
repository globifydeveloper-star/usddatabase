'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import {
    Dropdown,
    DropdownHeader,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useCurrentUser, CmsRole } from '@/hooks/useCurrentUser';

const roleLabels: Record<string, string> = {
    superadmin: 'Superadmin',
    editor: 'Admin',
    viewer: 'Viewer',
};

const formatRoleLabel = (role: CmsRole) =>
    roleLabels[role] ?? role.charAt(0).toUpperCase() + role.slice(1);

const ProfileDropdown = () => {
    const router = useRouter();
    const user = useCurrentUser();
    const roleLabel = user ? formatRoleLabel(user.role) : '';

    const handleLogout = async () => {
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('has_acknowledged_db_structure_warning');
        }
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
        router.refresh();
    };

    return (
        <div className="topbar-item nav-user">
            <Dropdown align={'end'}>
                <DropdownToggle
                    as={'a'}
                    className="topbar-link drop-arrow-none px-2"
                    data-bs-toggle="dropdown"
                    data-bs-offset="0,25"
                    type="button"
                    aria-haspopup="false"
                    aria-expanded="false"
                >
                    <div className="d-flex align-items-center">
                        <span className="d-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle me-1 me-lg-2" style={{ width: 32, height: 32 }}>
                            <IconifyIcon icon="ri:user-3-line" className="fs-18" />
                        </span>
                        <span className="d-none d-lg-flex flex-column gap-1">
                            <h5 className="my-0">{roleLabel || 'Account'}</h5>
                        </span>
                        <IconifyIcon
                            icon="ri:arrow-down-s-line"
                            className="d-none d-lg-block align-middle ms-2"
                        />
                    </div>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <DropdownHeader className="noti-title">
                        <h6 className="text-overflow m-0">Welcome !</h6>
                        {user?.email && <div className="text-muted small text-truncate">{user.email}</div>}
                    </DropdownHeader>
                    <div className="dropdown-divider" />
                    <DropdownItem onClick={handleLogout} className="active fw-semibold text-danger">
                        <IconifyIcon
                            icon="ri:logout-box-line"
                            className="me-1 fs-17 align-middle"
                        />
                        &nbsp;
                        <span className="align-middle">Sign Out</span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default ProfileDropdown;
