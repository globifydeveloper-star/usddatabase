'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Role {
    id?: number;
    role_name: string;
}

interface Props {
    show: boolean;
    onClose: () => void;
    data: Role | null;
    onSuccess: () => void;
}

const emptyRole: Role = {
    role_name: '',
};

const EditRoleModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<Role>(emptyRole);

    // Set role data when editing
    useEffect(() => {
        if (data) {
            setFormData({
                id: data.id,
                role_name: data.role_name,
            });
        } else {
            setFormData(emptyRole);
        }
    }, [data, show]);

    const handleChange = (value: string) => {
        setFormData({
            ...formData,
            role_name: value,
        });
    };

    const handleSave = async () => {
        try {
            const isEdit = !!data;

            const roleName = formData.role_name.trim();

            // Required validation
            if (!roleName) {
                toast.error('Role name is required');
                return;
            }

            const url = isEdit ? `/api/roles/${data?.id}` : `/api/roles`;

            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (result.success) {
                onSuccess();
                onClose();
            } else {
                toast.error(result.message || 'Save failed');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{data ? 'Edit Role' : 'Add New Role'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Role Name</Form.Label>

                        <Form.Control
                            type="text"
                            value={formData.role_name}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder="Enter role name"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>

                <Button variant="primary" onClick={handleSave}>
                    {data ? 'Update Role' : 'Create Role'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditRoleModal;
