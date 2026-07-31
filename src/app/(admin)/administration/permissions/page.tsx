'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Badge, Table } from 'react-bootstrap';

const permissionMatrix = [
  {
    role: 'Superadmin',
    level: 'Full control',
    color: 'primary',
    content: [
      'Create, edit and delete data across the platform',
      'Create superadmin, admin and viewer accounts',
      'Download Comparison reports and review system data',
    ],
    user: [
      'Disable user accounts',
      'Reset passwords',
      'View login history',
      'Manage permissions',
    ],
    security: [
      'Review audit logs',
      'Force logout users',
      'Control sensitive security actions',
    ],
  },
  {
    role: 'Admin',
    level: 'Managed access',
    color: 'info',
    content: [
      'Create, edit and delete data',
      'Download Comparison reports',
      'Review shared content updates',
    ],
    user: [
      'Reset viewer passwords',
      'Support account maintenance',
    ],
    security: [
      'Access basic security oversight',
    ],
  },
  {
    role: 'Viewer',
    level: 'Read-only access',
    color: 'secondary',
    content: [
      'Read all available data',
      'Review content without editing',
      'Download Comparison Reports'
    ],
    user: [],
    security: [],
  },
];

const PermissionsPage = () => {
  return (
    <ComponentContainerCard
      title="Role Permissions"
      description="View the permissions and access levels assigned to each role."
    >
      <div className="border rounded-3 p-3 bg-light-subtle">
        {/* <div className="d-flex flex-wrap gap-2 mb-3">
          <Badge bg="primary" className="px-3 py-2">
            Content Management
          </Badge>
          <Badge bg="info" className="px-3 py-2">
            User Management
          </Badge>
          <Badge bg="secondary" className="px-3 py-2">
            Security
          </Badge>
        </div> */}

        <div className="table-responsive">
          <Table bordered hover className="align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th style={{ minWidth: '150px' }}>Role</th>
                <th style={{ minWidth: '240px' }}>Content Management</th>
                <th style={{ minWidth: '240px' }}>User Management</th>
                <th style={{ minWidth: '220px' }}>Security</th>
              </tr>
            </thead>
            <tbody>
              {permissionMatrix.map((item) => (
                <tr key={item.role}>
                  <td>
                    <div className="fw-semibold text-dark">{item.role}</div>
                    <Badge bg={item.color as 'primary' | 'info' | 'secondary'} className="mt-2">
                      {item.level}
                    </Badge>
                  </td>
                  <td>
                    <ul className="mb-0 ps-3">
                      {item.content.map((entry) => (
                        <li key={entry} className="mb-1 text-muted">
                          {entry}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    {item.user.length > 0 ? (
                      <ul className="mb-0 ps-3">
                        {item.user.map((entry) => (
                          <li key={entry} className="mb-1 text-muted">
                            {entry}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted">No user management actions</span>
                    )}
                  </td>
                  <td>
                    {item.security.length > 0 ? (
                      <ul className="mb-0 ps-3">
                        {item.security.map((entry) => (
                          <li key={entry} className="mb-1 text-muted">
                            {entry}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted">No security actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </ComponentContainerCard>
  );
};

export default PermissionsPage;