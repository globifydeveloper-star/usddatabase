'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

interface Admissions {
    unitid: string;
    test_requirements: number | null;
    admission_rate: number | null;
}

interface Props {
    show: boolean;
    onClose: () => void;
    data: Admissions | null;
    onSuccess: () => void;
}

const EditAdmissionsModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<Admissions | null>(null);
    const [loading, setLoading] = useState(false);

    // Set selected row data
    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleChange = (key: keyof Admissions, value: string | boolean | number | null) => {
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

            const response = await fetch(`/api/admissions/${formData.unitid}`, {
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
                <Modal.Title>Edit Admission Data</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Unit ID (Primary Key - Disabled) */}
                    <Form.Group className="mb-3">
                        <Form.Label>Unit ID</Form.Label>
                        <Form.Control type="text" value={formData.unitid} disabled />
                    </Form.Group>

                    {/* Requirements */}
                    <Form.Group className="mb-3">
                        <Form.Label>Test Requirements</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.test_requirements ?? ''}
                            onChange={(e) => handleChange('test_requirements', e.target.value)}
                        />
                    </Form.Group>

                    {/* rate*/}
                    <Form.Group className="mb-3">
                        <Form.Label>Admissions Rate</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.0001"
                            value={formData.admission_rate ?? ''}
                            onChange={(e) => handleChange('admission_rate', e.target.value)}
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

export default EditAdmissionsModal;
