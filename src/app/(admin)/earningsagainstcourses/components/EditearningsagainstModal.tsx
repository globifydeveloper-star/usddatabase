'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
interface Props {
    show: boolean;
    onClose: () => void;
    data: EarningsAgainstCourses | null;
    onSuccess: () => void;
}

const EditearningsagainstModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<EarningsAgainstCourses | null>(null);
    const [loading, setLoading] = useState(false);

    // Set selected row data
    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleChange = (
        key: keyof EarningsAgainstCourses,
        value: string | boolean | number | null
    ) => {
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

            const response = await fetch(`/api/earningsagainstcourses/${formData.id}`, {
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
                <Modal.Title>Edit Earnings Against Courses Data</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Unit ID */}
                    <Form.Group className="mb-3">
                        <Form.Label>Unit ID</Form.Label>
                        <Form.Control type="number" value={formData.unitid ?? ''} disabled />
                    </Form.Group>

                    {/* OPE8 ID */}
                    <Form.Group className="mb-3">
                        <Form.Label>OPE8 ID</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.ope8_id ?? ""}
                            onChange={(e) => handleChange("ope8_id", e.target.value)}
                        />
                    </Form.Group>

                    {/* School Name */}
                    <Form.Group className="mb-3">
                        <Form.Label>School Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.school_name ?? ''}
                            onChange={(e) => handleChange('school_name', e.target.value)}
                        />
                    </Form.Group>

                    {/* CIP Code */}
                    <Form.Group className="mb-3">
                        <Form.Label>CIP Code</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.cip_code ?? ''}
                            onChange={(e) => handleChange('cip_code', e.target.value)}
                        />
                    </Form.Group>

                    {/* CIP Title */}
                    <Form.Group className="mb-3">
                        <Form.Label>CIP Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.cip_title ?? ''}
                            onChange={(e) => handleChange('cip_title', e.target.value)}
                        />
                    </Form.Group>

                    {/* Grad Cohort */}
                    <Form.Group className="mb-3">
                        <Form.Label>Grad Cohort</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.grad_cohort ?? ""}
                            onChange={(e) => handleChange("grad_cohort", e.target.value)}
                        />
                    </Form.Group>

                    {/* Year 1 Earnings */}
                    <Form.Group className="mb-3">
                        <Form.Label>Year 1 Earnings</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.year_1 ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'year_1',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    {/* Year 5 Earnings */}
                    <Form.Group className="mb-3">
                        <Form.Label>Year 5 Earnings</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.year_5 ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'year_5',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    {/* Year 10 Earnings */}
                    <Form.Group className="mb-3">
                        <Form.Label>Year 10 Earnings</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.year_10 ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'year_10',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    {/* Credential Level */}
                    <Form.Group className="mb-3">
                        <Form.Label>Credential Level</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.credential_level ?? ""}
                            onChange={(e) =>
                                handleChange(
                                    "credential_level",
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    {/* Credential Title */}
                    <Form.Group className="mb-3">
                        <Form.Label>Credential Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.credential_title ?? ''}
                            onChange={(e) => handleChange('credential_title', e.target.value)}
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

export default EditearningsagainstModal;
