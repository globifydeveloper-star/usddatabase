'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { User } from '@/types/user';

interface Role {
    id: number;
    role_name: string;
}

interface Props {
    show: boolean;
    onClose: () => void;
    data: User | null;
    onSuccess: () => void;
}

const EditUserModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<User | null>(null);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loadingRoles, setLoadingRoles] = useState(false);

    // Set selected user data
    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    // Fetch roles when modal opens
    useEffect(() => {
        if (!show) return;

        const fetchRoles = async () => {
            try {
                setLoadingRoles(true);

                const res = await fetch('/api/roles/all');
                const result = await res.json();

                if (result.success) {
                    setRoles(result.data);
                }
            } catch (error) {
                console.error("Roles fetch error:", error);
            } finally {
                setLoadingRoles(false);
            }
        };

        fetchRoles();
    }, [show]);

    const handleChange = (key: keyof User, value: any) => {
        if (!formData) return;

        setFormData({
            ...formData,
            [key]: value,
        });
    };

    const handleSave = async () => {
        if (!formData) return;

        try {
            const response = await fetch(`/api/users/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                onSuccess();
                onClose();
            } else {
                alert(result.message || 'Update failed');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        }
    };

    if (!formData) return null;

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Full Name */}
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.full_name}
                            onChange={(e) =>
                                handleChange('full_name', e.target.value)
                            }
                        />
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                handleChange('email', e.target.value)
                            }
                        />
                    </Form.Group>

                    {/* Role Dropdown */}
                    <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            value={formData.role_id}
                            onChange={(e) =>
                                handleChange('role_id', Number(e.target.value))
                            }
                            disabled={loadingRoles}
                        >
                            <option value="">Select Role</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.role_name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Active Switch */}
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="switch"
                            label="Active"
                            checked={formData.is_active ?? false}
                            onChange={(e) =>
                                handleChange('is_active', e.target.checked)
                            }
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditUserModal;