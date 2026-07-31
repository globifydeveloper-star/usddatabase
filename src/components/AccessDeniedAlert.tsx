'use client';

import { Alert } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

interface Props {
  message?: string;
}

const AccessDeniedAlert = ({ message = "You don't have access to this data." }: Props) => {
  return (
    <Alert variant="danger" className="d-flex align-items-center gap-2 mb-0">
      <IconifyIcon icon="ri:shield-cross-line" className="fs-20" />
      <span>{message}</span>
    </Alert>
  );
};

export default AccessDeniedAlert;
