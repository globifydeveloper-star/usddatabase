'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Repayment } from '@/types/repayment';

interface Props {
    show: boolean;
    onClose: () => void;
    data: Repayment | null;
    onSuccess: () => void;
}

const EditRepaymentModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<Repayment | null>(null);
    const [loading, setLoading] = useState(false);

    // Set selected row data
    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleChange = (key: keyof Repayment, value: string | boolean | number | null) => {
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

            const response = await fetch(`/api/repayment/${formData.unitid}`, {
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
                <Modal.Title>Edit Repayment Data</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Unit ID (Primary Key - Disabled) */}
                    <Form.Group className="mb-3">
                        <Form.Label>Unit ID</Form.Label>
                        <Form.Control type="text" value={formData.unitid} disabled />
                    </Form.Group>

                    {/* yr1_completers*/}
                    <Form.Group className="mb-3">
                        <Form.Label>yr1_completers</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.yr1_completers ?? ''}
                            onChange={(e) => handleChange('yr1_completers', e.target.value)}
                        />
                    </Form.Group>

                    {/* yr1_noncompleters*/}
                    <Form.Group className="mb-3">
                        <Form.Label>yr1_noncompleters</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.yr1_noncompleters ?? ''}
                            onChange={(e) => handleChange('yr1_noncompleters', e.target.value)}
                        />
                    </Form.Group>
                    {/* yr1_overall */}
                    <Form.Group className="mb-3">
                        <Form.Label>yr1_overall</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.yr1_overall ?? ''}
                            onChange={(e) => handleChange('yr1_overall', e.target.value)}
                        />
                    </Form.Group>
                    {/* yr3_completers */}
                    <Form.Group className="mb-3">
                        <Form.Label>yr3_completers</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.yr3_completers ?? ''}
                            onChange={(e) => handleChange('yr3_completers', e.target.value)}
                        />
                    </Form.Group>

                    {/* yr3_noncompleters*/}
                    <Form.Group className="mb-3">
                        <Form.Label>yr3_noncompleters</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.yr3_noncompleters ?? ''}
                            onChange={(e) => handleChange('yr3_noncompleters', e.target.value)}
                        />
                    </Form.Group>

                    {/* yr3_overall */}

                    <Form.Group className="mb-3">
                        <Form.Label>yr3_overall</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.yr3_overall ?? ''}
                            onChange={(e) => handleChange('yr3_overall', e.target.value)}
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

export default EditRepaymentModal;
