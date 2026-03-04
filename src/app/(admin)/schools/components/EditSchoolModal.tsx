'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

interface Schools {
    unitid: string;
    name: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    address: string | null;
    accreditor: string | null;
    degrees_awarded: number | null;
    school_url: string | null;
    has_pseo: boolean | null;
    ope8_id: string | null;
}

interface Props {
    show: boolean;
    onClose: () => void;
    data: Schools | null;
    onSuccess: () => void;
}

const EditSchoolModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<Schools | null>(null);
    const [loading, setLoading] = useState(false);

    // Set selected row data
    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleChange = (key: keyof Schools, value: string | boolean | number | null) => {
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

            const response = await fetch(`/api/schools/${formData.unitid}`, {
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
                <Modal.Title>Edit School Data</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Unit ID (Primary Key - Disabled) */}
                    <Form.Group className="mb-3">
                        <Form.Label>Unit ID</Form.Label>
                        <Form.Control type="text" value={formData.unitid} disabled />
                    </Form.Group>

                    {/* School Name */}
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.name ?? ''}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                    </Form.Group>

                    {/* city*/}
                    <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="string"
                            step="0.0001"
                            value={formData.city ?? ''}
                            onChange={(e) => handleChange('city', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.state ?? ''}
                            onChange={(e) => handleChange('state', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.zip ?? ''}
                            onChange={(e) => handleChange('zip', e.target.value)}
                        />
                    </Form.Group>

                    {/* Address */}
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.address ?? ''}
                            onChange={(e) => handleChange('address', e.target.value)}
                        />
                    </Form.Group>

                    {/* Accreditor */}

                    <Form.Group className="mb-3">
                        <Form.Label>accreditor</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.accreditor ?? ''}
                            onChange={(e) => handleChange('accreditor', e.target.value)}
                        />
                    </Form.Group>
                    {/* SchoolURL */}
                    <Form.Group className="mb-3">
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.school_url ?? ''}
                            onChange={(e) => handleChange('school_url', e.target.value)}
                        />
                    </Form.Group>
                    {/* degrees_awarded */}
                    <Form.Group className="mb-3">
                        <Form.Label>Degrees</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.degrees_awarded ?? ''}
                            onChange={(e) => handleChange('degrees_awarded', e.target.value ==="" ? null : Number(e.target.value))}
                        />
                    </Form.Group>
                    {/* has_pseo */}
                    <Form.Group className="mb-3">
                        <Form.Label>PSEO</Form.Label>
                        <Form.Select
                            value={formData.has_pseo ? 'true' : 'false'}
                            onChange={(e) => handleChange('has_pseo', e.target.value === 'true')}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </Form.Select>
                    </Form.Group>
                    {/* ope8_id */}
                    <Form.Group className="mb-3">
                        <Form.Label>ope8_id</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.ope8_id ?? ''}
                            onChange={(e) => handleChange('ope8_id', e.target.value)}
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
