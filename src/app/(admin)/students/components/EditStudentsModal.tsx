'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

interface Student {
    id: number;
    unitid: string;
    size: string | null;
    grad_students: string | null;
    enrollment_grad_12_month: string | null;
    enrollment_undergrad_12_month: string | null;
    fafsa_applications: string | null;
    demographics_men: string | null;
    demographics_women: string | null;
    faculty_men: string | null;
    faculty_women: string | null;
}

interface Props {
    show: boolean;
    onClose: () => void;
    data: Student | null;
    onSuccess: () => void;
}

const EditStudentsModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<Student | null>(null);
    const [loading, setLoading] = useState(false);

    // Set selected row data
    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleChange = (key: keyof Student, value: string | boolean | number | null) => {
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

            const response = await fetch(`/api/students/${formData.unitid}`, {
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
                <Modal.Title>Edit Student Data</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Unit ID (Primary Key - Disabled) */}
                    <Form.Group className="mb-3">
                        <Form.Label>Unit ID</Form.Label>
                        <Form.Control type="text" value={formData.unitid} disabled />
                    </Form.Group>

                    {/* size */}
                    <Form.Group className="mb-3">
                        <Form.Label>Size</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.size ?? ''}
                            onChange={(e) => handleChange('size', e.target.value)}
                        />
                    </Form.Group>

                    {/* grad_students*/}
                    <Form.Group className="mb-3">
                        <Form.Label>Grad Students</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.0001"
                            value={formData.grad_students ?? ''}
                            onChange={(e) => handleChange('grad_students', e.target.value)}
                        />
                    </Form.Group>
                    {/* grad 12 month*/}
                    <Form.Group className="mb-3">
                        <Form.Label>Grad 12 month</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.0001"
                            value={formData.enrollment_grad_12_month ?? ''}
                            onChange={(e) =>
                                handleChange('enrollment_grad_12_month', e.target.value)
                            }
                        />
                    </Form.Group>

                    {/* Undergrad 12 month*/}
                    <Form.Group className="mb-3">
                        <Form.Label>UnderGrad 12 month</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.0001"
                            value={formData.enrollment_undergrad_12_month ?? ''}
                            onChange={(e) => handleChange('enrollment_undergrad_12_month', e.target.value)}
                        />
                    </Form.Group>

                    {/* fafsa_applications*/}
                    <Form.Group className="mb-3">
                        <Form.Label>fafsa_applications</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.0001"
                            value={formData.fafsa_applications ?? ''}
                            onChange={(e) => handleChange('fafsa_applications', e.target.value)}
                        />
                    </Form.Group>

                    {/* demographics_men*/}
                    <Form.Group className="mb-3">
                        <Form.Label>demographics_men</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.0001"
                            value={formData.demographics_men ?? ''}
                            onChange={(e) => handleChange('demographics_men', e.target.value)}
                        />
                    </Form.Group>

                    {/* demographics_women*/}
                    <Form.Group className="mb-3">
                        <Form.Label>demographics_women</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.0001"
                            value={formData.demographics_women ?? ''}
                            onChange={(e) => handleChange('demographics_women', e.target.value)}
                        />
                    </Form.Group>

                    {/* faculty_men*/}
                    <Form.Group className="mb-3">
                        <Form.Label>faculty_men</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.0001"
                            value={formData.faculty_men ?? ''}
                            onChange={(e) => handleChange('faculty_men', e.target.value)}
                        />
                    </Form.Group>

                    {/* faculty_women*/}
                    <Form.Group className="mb-3">
                        <Form.Label>faculty_women</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.0001"
                            value={formData.faculty_women ?? ''}
                            onChange={(e) => handleChange('faculty_women', e.target.value)}
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

export default EditStudentsModal;
