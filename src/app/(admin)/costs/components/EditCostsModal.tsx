'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

 interface Costs {
  unitid: number;

  booksupply: number | null;
  tuition_in_state: number | null;
  tuition_out_state: number | null;
  tuition_program_year: number | null;

  roomboard_oncampus: number | null;
  roomboard_offcampus: number | null;

  avg_net_price_public: number | null;
  avg_net_price_private: number | null;
  avg_net_price_overall: number | null;

  otherexpense_oncampus: number | null;
  otherexpense_offcampus: number | null;
  otherexpense_withfamily: number | null;
}

interface Props {
    show: boolean;
    onClose: () => void;
    data: Costs | null;
    onSuccess: () => void;
}

const EditSchoolModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<Costs | null>(null);
    const [loading, setLoading] = useState(false);

    // Set selected row data
    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleChange = (key: keyof Costs, value: string | boolean | number | null) => {
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

            const response = await fetch(`/api/costs/${formData.unitid}`, {
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
                <Modal.Title>Edit Costs Data</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Unit ID (Primary Key - Disabled) */}
                    <Form.Group className="mb-3">
                        <Form.Label>Unit ID</Form.Label>
                        <Form.Control type="text" value={formData.unitid} disabled />
                    </Form.Group>

                    {/* booksupply*/}
                    <Form.Group className="mb-3">
                        <Form.Label>booksupply</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.booksupply ?? ''}
                            onChange={(e) => handleChange('booksupply', e.target.value)}
                        />
                    </Form.Group>

                    {/* tuition_in_state*/}
                    <Form.Group className="mb-3">
                        <Form.Label>tuition_in_state</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.tuition_in_state ?? ''}
                            onChange={(e) => handleChange('tuition_in_state', e.target.value)}
                        />
                    </Form.Group>
                    {/* tuition_out_state */}
                    <Form.Group className="mb-3">
                        <Form.Label>tuition_out_state</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.tuition_out_state ?? ''}
                            onChange={(e) => handleChange('tuition_out_state', e.target.value)}
                        />
                    </Form.Group>
                        {/* tuition_program_year */}
                    <Form.Group className="mb-3">
                        <Form.Label>tuition_program_year</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.tuition_program_year ?? ''}
                            onChange={(e) => handleChange('tuition_program_year', e.target.value)}
                        />
                    </Form.Group>

                    {/* roomboard_oncampus*/}
                    <Form.Group className="mb-3">
                        <Form.Label>roomboard_oncampus</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.roomboard_oncampus ?? ''}
                            onChange={(e) => handleChange('roomboard_oncampus', e.target.value)}
                        />
                    </Form.Group>

                    {/* roomboard_offcampus */}

                    <Form.Group className="mb-3">
                        <Form.Label>roomboard_offcampus</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.roomboard_offcampus ?? ''}
                            onChange={(e) => handleChange('roomboard_offcampus', e.target.value)}
                        />
                    </Form.Group>

                      {/* avg_net_price_private */}

                    <Form.Group className="mb-3">
                        <Form.Label>avg_net_price_private</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.avg_net_price_private ?? ''}
                            onChange={(e) => handleChange('avg_net_price_private', e.target.value)}
                        />
                    </Form.Group>

                      {/* avg_net_price_overall */}

                    <Form.Group className="mb-3">
                        <Form.Label>avg_net_price_overall</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.avg_net_price_overall ?? ''}
                            onChange={(e) => handleChange('avg_net_price_overall', e.target.value)}
                        />
                    </Form.Group>

                      {/* otherexpense_oncampus */}

                    <Form.Group className="mb-3">
                        <Form.Label>otherexpense_oncampus</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.otherexpense_oncampus ?? ''}
                            onChange={(e) => handleChange('otherexpense_oncampus', e.target.value)}
                        />
                    </Form.Group>

                      {/* otherexpense_offcampus */}

                    <Form.Group className="mb-3">
                        <Form.Label>otherexpense_offcampus</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.otherexpense_offcampus ?? ''}
                            onChange={(e) => handleChange('otherexpense_offcampus', e.target.value)}
                        />
                    </Form.Group>

                      {/* otherexpense_withfamily */}

                    <Form.Group className="mb-3">
                        <Form.Label>otherexpense_withfamily</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.otherexpense_withfamily ?? ''}
                            onChange={(e) => handleChange('otherexpense_withfamily', e.target.value)}
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
