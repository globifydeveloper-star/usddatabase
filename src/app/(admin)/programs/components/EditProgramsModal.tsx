'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Program } from '@/types/programs';
import { toast } from 'react-toastify';

interface Props {
    show: boolean;
    onClose: () => void;
    data: Program | null;
    onSuccess: () => void;
}

const emptyProgram: Program = {
    id: 0,
    unitid: '',
    cip_code: null,
    title: null,
    credential_level: null,
    credential_title: null,
    school_name: null,
    school_type: null,
};
const credentialMap: Record<string, string> = {
    '1': 'Undergraduate Certificate or Diploma',
    '2': "Associate's Degree",
    '3': "Bachelor's Degree",
    '4': 'Post-baccalaureate Certificate',
    '5': "Master's Degree",
    '6': 'Doctoral Degree',
    '7': 'First Professional Degree',
    '8': 'Graduate/Professional Certificate',
};

const EditProgramModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<Program>(emptyProgram);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [schoolResults, setSchoolResults] = useState<any[]>([]);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        if (data) {
            setFormData({ ...data });
        } else {
            setFormData({ ...emptyProgram });
        }
    }, [data, show]);

    const handleChange = (key: keyof Program, value: string | number | null) => {
        if (key === 'credential_level') {
            const level = String(value);

            setFormData((prev) => ({
                ...prev,
                credential_level: level,
                credential_title: credentialMap[level] || '',
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [key]: value,
            }));
        }

        setErrors((prev) => ({
            ...prev,
            [key]: '',
        }));
    };

    const searchSchools = async (value: string) => {
        handleChange('unitid', value);

        if (value.length < 2) {
            setSchoolResults([]);
            return;
        }

        try {
            setSearching(true);

            const res = await fetch(`/api/schools?search=${value}&limit=5`);
            const data = await res.json();

            setSchoolResults(data.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setSearching(false);
        }
    };

    const selectSchool = (school: any) => {
        setFormData((prev) => ({
            ...prev,
            unitid: school.unitid,
            school_name: school.name,
        }));

        setErrors((prev) => ({
            ...prev,
            unitid: '',
            school_name: '',
        }));

        setSchoolResults([]);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.unitid) {
            newErrors.unitid = 'Unit ID is required';
        } else if (!/^\d{6}$/.test(formData.unitid)) {
            newErrors.unitid = 'Unit ID must be exactly 6 digits';
        }

        if (!formData.cip_code?.trim()) {
            newErrors.cip_code = 'CIP Code is required';
        }

        if (!formData.title?.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.credential_level) {
  newErrors.credential_level = 'Credential level is required';
}

        if (!formData.credential_title) {
  newErrors.credential_title = 'Credential title is required';
}

        if (!formData.school_name?.trim()) {
            newErrors.school_name = 'School name is required';
        }

        if (!formData.school_type?.trim()) {
            newErrors.school_type = 'School type is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);

            const isEdit = !!data;

            const url = isEdit ? `/api/programs/${data?.unitid}` : `/api/programs`;

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
                    toast.error(`Program already exists (${result.unitid})`);
                } else {
                    toast.error(result.message || 'Save failed');
                }
                return;
            }

            toast.success(data ? 'Program updated successfully' : 'Program created successfully');

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
                <Modal.Title>{data ? 'Edit Program Data' : 'Add Program'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* UNIT ID SEARCH */}
                    <Form.Group className="mb-3 position-relative">
                        <Form.Label>
                            Unit ID <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                            type="text"
                            value={formData.unitid}
                            disabled={!!data}
                            isInvalid={!!errors.unitid}
                            onChange={(e) => searchSchools(e.target.value)}
                            placeholder="Search Unit ID or School Name"
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.unitid}
                        </Form.Control.Feedback>

                        {searching && <small className="text-muted">Searching...</small>}

                        {schoolResults.length > 0 && (
                            <div className="autocomplete-box">
                                {schoolResults.map((school) => (
                                    <div
                                        key={school.unitid}
                                        className="autocomplete-item"
                                        onClick={() => selectSchool(school)}
                                    >
                                        <strong>{school.unitid}</strong> — {school.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Form.Group>

                    {/* CIP Code */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            CIP Code <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                            type="number"
                            value={formData.cip_code ?? ''}
                            isInvalid={!!errors.cip_code}
                            onChange={(e) => handleChange('cip_code', e.target.value)}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.cip_code}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Title */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Title <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                            type="text"
                            value={formData.title ?? ''}
                            isInvalid={!!errors.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />

                        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                    </Form.Group>

                   {/* Credential Level */}
<Form.Group className="mb-3">
  <Form.Label>
    Credential Level <span className="text-danger">*</span>
  </Form.Label>

  <Form.Select
    value={formData.credential_level ?? ''}
    isInvalid={!!errors.credential_level}
    onChange={(e) =>
      handleChange('credential_level', Number(e.target.value))
    }
  >
    <option value="">Select Credential Level</option>
    <option value={1}>1 - Undergraduate Certificate or Diploma</option>
    <option value={2}>2 - Associate's Degree</option>
    <option value={3}>3 - Bachelor's Degree</option>
    <option value={4}>4 - Post-baccalaureate Certificate</option>
    <option value={5}>5 - Master's Degree</option>
    <option value={6}>6 - Doctoral Degree</option>
    <option value={7}>7 - First Professional Degree</option>
    <option value={8}>8 - Graduate/Professional Certificate</option>
  </Form.Select>

  <Form.Control.Feedback type="invalid">
    {errors.credential_level}
  </Form.Control.Feedback>
</Form.Group>

                    {/* Credential Title */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Credential Title <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                            type="text"
                            value={formData.credential_title ?? ''}
                            isInvalid={!!errors.credential_title}
                            readOnly
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.credential_title}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* School Name */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            School Name <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                            type="text"
                            value={formData.school_name ?? ''}
                            isInvalid={!!errors.school_name}
                            onChange={(e) => handleChange('school_name', e.target.value)}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.school_name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* School Type */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            School Type <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                            type="text"
                            value={formData.school_type ?? ''}
                            isInvalid={!!errors.school_type}
                            onChange={(e) => handleChange('school_type', e.target.value)}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.school_type}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>

                <Button variant="primary" onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : data ? 'Update Program' : 'Create Program'}
                </Button>
            </Modal.Footer>
            <style jsx>{`
                .autocomplete-box {
                    border: 1px solid #374151;
                    background: #111827;
                    max-height: 200px;
                    overflow-y: auto;
                    border-radius: 6px;
                    margin-top: 4px;
                    position: absolute;
                    width: 100%;
                    z-index: 10;
                }

                .autocomplete-item {
                    padding: 8px 10px;
                    cursor: pointer;
                }

                .autocomplete-item:hover {
                    background: #1f2937;
                }
            `}</style>
        </Modal>
    );
};

export default EditProgramModal;
