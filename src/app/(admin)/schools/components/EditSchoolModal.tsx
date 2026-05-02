'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { School } from '@/types/schools';
import { toast } from 'react-toastify';

interface Props {
    show: boolean;
    onClose: () => void;
    data: School | null;
    onSuccess: () => void;
}

const emptySchool: School = {
    unitid: '',
    name: null,
    city: null,
    state: null,
    zip: null,
    address: null,
    accreditor: null,
    school_url: null,
    degrees_awarded: null,
    has_pseo: false,
    ope8_id: null,
    program_count: null,
};

const EditSchoolModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<School>(emptySchool);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (data) {
            setFormData({ ...data });
        } else {
            setFormData({ ...emptySchool });
        }
    }, [data, show]);

    const handleChange = (key: keyof School, value: string | boolean | number | null) => {
        setFormData({
            ...formData,
            [key]: value,
        });

        setErrors((prev) => ({
            ...prev,
            [key]: '',
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // UnitID
        if (!formData.unitid) {
            newErrors.unitid = 'Unit ID is required';
        } else if (!/^\d{6}$/.test(formData.unitid)) {
            newErrors.unitid = 'Unit ID must be exactly 6 digits';
        }

        // Name
        if (!formData.name?.trim()) {
            newErrors.name = 'School name is required';
        }

        // City
        if (!formData.city?.trim()) {
            newErrors.city = 'City is required';
        }

        // State
        if (!formData.state?.trim()) {
            newErrors.state = 'State is required';
        }

        // Address
        if (!formData.address?.trim()) {
            newErrors.address = 'Address is required';
        }

        // OPE8
        if (!formData.ope8_id) {
            newErrors.ope8_id = 'OPE8 ID is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);

            const isEdit = !!data;

            const url = isEdit ? `/api/schools/${data?.unitid}` : `/api/schools`;

            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                if (result.exists) {
                    toast.error(`UnitID already exists (${result.unitid} - ${result.name})`);
                } else {
                    toast.error(result.message || 'Save failed');
                }
                return;
            }

            toast.success(data ? 'School updated successfully' : 'School created successfully');

            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{data ? 'Edit School Data' : 'Add School'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Unit ID */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Unit ID <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.unitid}
                            disabled={!!data}
                            isInvalid={!!errors.unitid}
                            onChange={(e) =>
                                handleChange('unitid', e.target.value.replace(/\D/g, ''))
                            }
                            placeholder="Numbers only"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.unitid}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Name */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.name ?? ''}
                            onChange={(e) => handleChange('name', e.target.value)}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    {/* City */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            City <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.city ?? ''}
                            onChange={(e) => handleChange('city', e.target.value)}
                            isInvalid={!!errors.city}
                        />
                        <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                    </Form.Group>

                    {/* State */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            State <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.state ?? ''}
                            onChange={(e) => handleChange('state', e.target.value)}
                            isInvalid={!!errors.state}
                        />
                        <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Zip */}
                    <Form.Group className="mb-3">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.zip ?? ''}
                            onChange={(e) => handleChange('zip', e.target.value)}
                            isInvalid={!!errors.zip}
                        />
                        <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Address */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Address <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.address ?? ''}
                            onChange={(e) => handleChange('address', e.target.value)}
                            isInvalid={!!errors.address}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.address}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Accreditor */}
                    <Form.Group className="mb-3">
                        <Form.Label>Accreditor</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.accreditor ?? ''}
                            onChange={(e) => handleChange('accreditor', e.target.value)}
                            isInvalid={!!errors.accreditor}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.accreditor}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Website */}
                    <Form.Group className="mb-3">
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.school_url ?? ''}
                            onChange={(e) => handleChange('school_url', e.target.value)}
                            isInvalid={!!errors.school_url}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.school_url}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Degrees */}
                    <Form.Group className="mb-3">
                        <Form.Label>Degrees Awarded</Form.Label>
                        <Form.Control
                            type="number"
                            isInvalid={!!errors.degrees_awarded}
                            value={formData.degrees_awarded ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'degrees_awarded',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.degrees_awarded}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* PSEO */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            PSEO <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                            value={formData.has_pseo ? 'true' : 'false'}
                            onChange={(e) => handleChange('has_pseo', e.target.value === 'true')}
                            isInvalid={!!errors.has_pseo}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.has_pseo}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* OPE8 ID */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            OPE8 ID <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.ope8_id ?? ''}
                            isInvalid={!!errors.ope8_id}
                            onChange={(e) => handleChange('ope8_id', e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.ope8_id}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Program Count */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Program Count <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.program_count ?? ''}
                            isInvalid={!!errors.program_count}
                            onChange={(e) =>
                                handleChange(
                                    'program_count',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.program_count}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>

                <Button variant="primary" onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : data ? 'Update School' : 'Create School'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditSchoolModal;
