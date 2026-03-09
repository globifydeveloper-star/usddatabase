'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { User, Role, UserFormData } from '@/types/user';
import { Icon } from '@iconify/react';
interface Props {
    show: boolean;
    onClose: () => void;
    data: User | null;
    onSuccess: () => void;
}
const emptyUser: UserFormData = {
    full_name: '',
    email: '',
    role_id: 1,
    is_active: true,
    password: '',
};
const EditUserModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<UserFormData>(emptyUser);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loadingRoles, setLoadingRoles] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Set selected user data
    useEffect(() => {
        if (data) {
            //add
            setFormData({
                id: data.id,
                full_name: data.full_name,
                email: data.email,
                role_id: data.role_id,
                is_active: data.is_active ?? true,
            });
        } else {
            setFormData(emptyUser); //edit
        }
    }, [data, show]);

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
                console.error('Roles fetch error:', error);
            } finally {
                setLoadingRoles(false);
            }
        };

        fetchRoles();
    }, [show]);

    const handleChange = (key: keyof UserFormData, value: any) => {
        if (!formData) return;

        setFormData({
            ...formData,
            [key]: value,
        });
    };

    const handleSave = async () => {
        try {
            const isEdit = !!data;

            const url = isEdit ? `/api/users/${data?.id}` : `/api/users`;
            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
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
                alert(result.message || 'Save failed');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{data ? 'Edit User' : 'Add New User'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Full Name */}
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.full_name}
                            onChange={(e) => handleChange('full_name', e.target.value)}
                        />
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                    </Form.Group>

                    {/* Role Dropdown */}
                    <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            value={formData.role_id}
                            onChange={(e) => handleChange('role_id', Number(e.target.value))}
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
                            onChange={(e) => handleChange('is_active', e.target.checked)}
                        />
                    </Form.Group>
                    {/*Password*/}
                    {!data && (
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>

                            <div className="position-relative">
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password || ''}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                    placeholder="Enter password"
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
                                    }}
                                >
                                    <Icon
                                        icon={showPassword ? 'ri:eye-off-line' : 'ri:eye-line'}
                                        width="20"
                                    />
                                </span>
                            </div>
                        </Form.Group>
                    )}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    {data ? 'Update User' : 'Create User'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditUserModal;
