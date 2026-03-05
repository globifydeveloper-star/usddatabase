'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

interface Completion {
    id: number;
    unitid: string;
    completed_2yrs: string | null;
    completed_3yrs: string | null;
    completed_4yrs: string | null;
    completed_6yrs: string | null;
}

interface Props {
    show: boolean;
    onClose: () => void;
    data: Completion | null;
    onSuccess: () => void;
}

const EditCompletionModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<Completion | null>(null);
    const [loading, setLoading] = useState(false);

    // Set selected row data
    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleChange = (key: keyof Completion, value: string | boolean | number | null) => {
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

            const response = await fetch(`/api/completion/${formData.unitid}`, {
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
                <Modal.Title>Edit Completion Data</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Unit ID (Primary Key - Disabled) */}
                    <Form.Group className="mb-3">
                        <Form.Label>Unit ID</Form.Label>
                        <Form.Control type="text" value={formData.unitid} disabled />
                    </Form.Group>

                    {/* completed_2yrs */}
                    <Form.Group className="mb-3">
                        <Form.Label>Completed 2yrs</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.completed_2yrs ?? ''}
                            onChange={(e) => handleChange('completed_2yrs', e.target.value)}
                        />
                    </Form.Group>

                    {/* completed_3yrs*/}
                    <Form.Group className="mb-3">
                        <Form.Label>Completed 3yrs</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.0001"
                            value={formData.completed_3yrs ?? ''}
                            onChange={(e) => handleChange('completed_3yrs', e.target.value)}
                        />
                    </Form.Group>
                    {/* completed_4yrs*/}
                    <Form.Group className="mb-3">
                        <Form.Label>Completed 4yrs</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.0001"
                            value={formData.completed_4yrs ?? ''}
                            onChange={(e) => handleChange('completed_4yrs', e.target.value)}
                        />
                    </Form.Group>

                    {/* completed_6yrs*/}
                    <Form.Group className="mb-3">
                        <Form.Label>Completed 6yrs</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.completed_6yrs ?? ''}
                            onChange={(e) => handleChange('completed_6yrs', e.target.value)}
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

export default EditCompletionModal;
