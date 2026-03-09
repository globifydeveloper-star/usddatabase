'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Admissions } from '@/types/admissions';

interface Props {
    show: boolean;
    onClose: () => void;
    data: Admissions | null;
    onSuccess: () => void;
}

const emptyAdmission: Admissions = {
    unitid: '',
    test_requirements: null,
    admission_rate: null,
};

const EditAdmissionsModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<Admissions>(emptyAdmission);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (data) {
            setFormData({
                unitid: data.unitid,
                test_requirements: data.test_requirements,
                admission_rate: data.admission_rate,
            });
        } else {
            setFormData({ ...emptyAdmission });
        }
    }, [data, show]);

    const handleChange = (key: keyof Admissions, value: string | number | null) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    const handleSave = async () => {
        if (!formData.unitid) {
            alert('Unit ID is required');
            return;
        }

        try {
            setLoading(true);

            const isEdit = !!data;

            const url = isEdit ? `/api/admissions/${data?.unitid}` : `/api/admissions`;

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
            console.error('Save admission error:', error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{data ? 'Edit Admission Data' : 'Add Admission Data'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Unit ID */}
                    <Form.Group className="mb-3">
                        <Form.Label>Unit ID</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.unitid}
                            disabled={!!data}
                            onChange={(e) => handleChange('unitid', e.target.value)}
                            placeholder="Enter unit ID"
                        />
                    </Form.Group>

                    {/* Test Requirements */}
                    <Form.Group className="mb-3">
                        <Form.Label>Test Requirements</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.test_requirements ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'test_requirements',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                            placeholder="Enter test requirement"
                        />
                    </Form.Group>

                    {/* Admission Rate */}
                    <Form.Group className="mb-3">
                        <Form.Label>Admission Rate</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={formData.admission_rate ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'admission_rate',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                            placeholder="Enter admission rate"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>

                <Button variant="primary" onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : data ? 'Update Admission' : 'Create Admission'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditAdmissionsModal;
