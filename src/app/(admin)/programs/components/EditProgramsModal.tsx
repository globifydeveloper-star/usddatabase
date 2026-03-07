'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

interface Program {
  id: number;
  unitid: string;
  cip_code: string | null;
  title: string | null;
  credential_level: string | null;
  credential_title: string | null;
  school_name: string | null;
  school_type: string | null;
}

interface Props {
    show: boolean;
    onClose: () => void;
    data: Program | null;
    onSuccess: () => void;
}

const EditSchoolModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<Program | null>(null);
    const [loading, setLoading] = useState(false);

    // Set selected row data
    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleChange = (key: keyof Program, value: string | boolean | number | null) => {
        if (!formData) return;

        setFormData({
            ...formData,
            [key]: value,
        });
    };

    const handleSave = async () => {
        if (!formData) return;

        try {
            setLoading(true);

            const response = await fetch(`/api/programs/${formData.id}`, {
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
        } finally {
            setLoading(false);
        }
    };

    if (!formData) return null;

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Program Data</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Unit ID (Primary Key - Disabled) */}
                    <Form.Group className="mb-3">
                        <Form.Label>Unit ID</Form.Label>
                        <Form.Control type="text" value={formData.unitid} disabled />
                    </Form.Group>

                    {/* cip_code*/}
                    <Form.Group className="mb-3">
                        <Form.Label>cip_code</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.cip_code ?? ''}
                            onChange={(e) => handleChange('cip_code', e.target.value)}
                        />
                    </Form.Group>

                    {/* title*/}
                    <Form.Group className="mb-3">
                        <Form.Label>title</Form.Label>
                        <Form.Control
                            type="string"
                            step="0.0001"
                            value={formData.title ?? ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                    </Form.Group>
                    {/* credential_level */}
                    <Form.Group className="mb-3">
                        <Form.Label>credential_level</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.credential_level ?? ''}
                            onChange={(e) => handleChange('credential_level', e.target.value)}
                        />
                    </Form.Group>
                        {/* credential_title */}
                    <Form.Group className="mb-3">
                        <Form.Label>credential_title</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.credential_title ?? ''}
                            onChange={(e) => handleChange('credential_title', e.target.value)}
                        />
                    </Form.Group>

                    {/* school_name */}
                    <Form.Group className="mb-3">
                        <Form.Label>school_name</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.school_name ?? ''}
                            onChange={(e) => handleChange('school_name', e.target.value)}
                        />
                    </Form.Group>

                    {/* school_type */}

                    <Form.Group className="mb-3">
                        <Form.Label>school_type</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.school_type ?? ''}
                            onChange={(e) => handleChange('school_type', e.target.value)}
                        />
                    </Form.Group>
                   
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose} disabled={loading}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditSchoolModal;
