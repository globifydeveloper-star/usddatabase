'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Earnings } from '@/types/earnings';

interface Props {
    show: boolean;
    onClose: () => void;
    data: Earnings | null;
    onSuccess: () => void;
}

const EditEarningsModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<Earnings | null>(null);
    const [loading, setLoading] = useState(false);

    // Set selected row data
    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleChange = (key: keyof Earnings, value: string | boolean | number | null) => {
        if (!formData) return;

        setFormData({
            ...formData,
            [key]: value,
        });
    };

    const handleSave = async () => {
        console.log("chh",formData);
        if (!formData) return;
        
        try {
            setLoading(true);

            const response = await fetch(`/api/earnings/${formData.unitid}`, {
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
                <Modal.Title>Edit Earnings Data</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Unit ID (Primary Key - Disabled) */}
                    <Form.Group className="mb-3">
                        <Form.Label>Unit ID</Form.Label>
                        <Form.Control type="text" value={formData.unitid} disabled />
                    </Form.Group>

                    {/* median_1yr*/}
                    <Form.Group className="mb-3">
                        <Form.Label>median_1yr</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.median_1yr ?? ''}
                            onChange={(e) => handleChange('median_1yr', e.target.value)}
                        />
                    </Form.Group>

                    {/* median_3yr*/}
                    <Form.Group className="mb-3">
                        <Form.Label>median_3yr</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.median_3yr ?? ''}
                            onChange={(e) => handleChange('median_3yr', e.target.value)}
                        />
                    </Form.Group>
                    {/* median_4yr */}
                    <Form.Group className="mb-3">
                        <Form.Label>median_4yr</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.median_4yr ?? ''}
                            onChange={(e) => handleChange('median_4yr', e.target.value)}
                        />
                    </Form.Group>
                    {/* median_5yr */}
                    <Form.Group className="mb-3">
                        <Form.Label>median_5yr</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.median_5yr ?? ''}
                            onChange={(e) => handleChange('median_5yr', e.target.value)}
                        />
                    </Form.Group>

                    {/* students_count*/}
                    <Form.Group className="mb-3">
                        <Form.Label>students_count</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.students_count ?? ''}
                            onChange={(e) => handleChange('students_count', e.target.value)}
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

export default EditEarningsModal;
