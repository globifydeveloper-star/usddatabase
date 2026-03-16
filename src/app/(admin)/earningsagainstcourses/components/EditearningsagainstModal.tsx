'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { EarningsAgainstCourses } from '@/types/EarningsAgainstCourses';
import { toast } from 'react-toastify';

interface Props {
    show: boolean;
    onClose: () => void;
    data: EarningsAgainstCourses | null;
    onSuccess: () => void;
}

const emptyEarningsAgainstCourses: EarningsAgainstCourses = {
    id: 0,
    unitid: null,
    ope8_id: null,
    school_name: null,
    cip_code: null,
    cip_title: null,
    grad_cohort: null,
    year_1: null,
    year_5: null,
    year_10: null,
    credential_level: null,
    credential_title: null,
};

const EditearningsagainstModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<EarningsAgainstCourses>(emptyEarningsAgainstCourses);
    const [loading, setLoading] = useState(false);
    const [schoolResults, setSchoolResults] = useState<any[]>([]);
    const [searching, setSearching] = useState(false);
    const [unitidInput, setUnitidInput] = useState('');
    const [schoolSelected, setSchoolSelected] = useState(false);
    // Update state type
    const [cipOptions, setCipOptions] = useState<
        {
            cip_code: string;
            cip_title: string;
            credential_level: number | null;
            credential_title: string | null;
        }[]
    >([]);
    const fetchCipOptions = async (unitid: number) => {
        try {
            const res = await fetch(`/api/schools/${unitid}/cip`);
            const json = await res.json();
            setCipOptions(json.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (data) {
            setFormData(data);
            setUnitidInput(String(data.unitid ?? ''));
            setSchoolSelected(false);
            //fetch CIP options so dropdown is populated in edit mode
             if (data.unitid) {
            fetchCipOptions(Number(data.unitid));
        }
        } else {
            setFormData({ ...emptyEarningsAgainstCourses });
            setUnitidInput('');
            setSchoolSelected(false);
        }
    }, [data, show]);

    const handleChange = (
        key: keyof EarningsAgainstCourses,
        value: string | boolean | number | null
    ) => {
        setFormData((prev) => ({
            ...(prev ?? emptyEarningsAgainstCourses),
            [key]: value,
        }));
    };

    /* -------- SCHOOL SEARCH -------- */
    const searchSchools = async (value: string) => {
        setUnitidInput(value);

        if (value.length < 2) {
            setSchoolResults([]);
            return;
        }

        try {
            setSearching(true);
            const res = await fetch(`/api/schools/search?q=${value}`);
            const json = await res.json();
            setSchoolResults(json.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setSearching(false);
        }
    };

    // Update selectSchool — reset all 4 program fields on new school
    const selectSchool = (school: any) => {
        setFormData((prev) => ({
            ...prev,
            unitid: Number(school.unitid),
            ope8_id: school.ope8_id ?? null,
            school_name: school.name ?? null,
            cip_code: null,
            cip_title: null,
            credential_level: null,
            credential_title: null,
        }));
        setUnitidInput(String(school.unitid));
        setSchoolResults([]);
        setSchoolSelected(true);
        fetchCipOptions(Number(school.unitid));
    };

    /* -------- SAVE -------- */
    const handleSave = async () => {
        const unitid = String(formData.unitid ?? '').trim();

        if (!unitid) {
            toast.error('Unit ID is required');
            return;
        }

        if (!/^\d{6}$/.test(unitid)) {
            toast.error('Unit ID must be exactly 6 digits');
            return;
        }

        try {
            setLoading(true);
            const isEdit = !!data;
            const url = isEdit
                ? `/api/earningsagainstcourses/${data?.unitid}`
                : `/api/earningsagainstcourses`;
            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                toast.success(
                    isEdit
                        ? 'Earnings data updated successfully'
                        : 'Earnings data added successfully'
                );
                onSuccess();
                onClose();
            } else {
                toast.error(result.message || 'Update failed');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!formData) return null;

    const isEdit = !!data;

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {isEdit
                        ? 'Edit Earnings Against Courses Data'
                        : 'Add Earnings Against Courses Data'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Unit ID with school search (only in add mode) */}
                    <Form.Group className="mb-4 position-relative">
                        <Form.Label className="fw-semibold">Unit ID
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={unitidInput}
                            disabled={isEdit}
                            onChange={(e) => searchSchools(e.target.value)}
                            placeholder="Search by Unit ID or School Name"
                        />
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

                    {/* OPE8 ID — auto-filled & locked after school selected */}
                    <Form.Group className="mb-3">
                        <Form.Label>OPE8 ID
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.ope8_id ?? ''}
                            disabled={schoolSelected || isEdit}
                            onChange={(e) => handleChange('ope8_id', e.target.value)}
                        />
                    </Form.Group>

                    {/* School Name — auto-filled & locked after school selected */}
                    <Form.Group className="mb-3">
                        <Form.Label>School Name
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.school_name ?? ''}
                            disabled={schoolSelected || isEdit}
                            onChange={(e) => handleChange('school_name', e.target.value)}
                        />
                    </Form.Group>

                    {/* CIP Code */}
                    <Form.Group className="mb-3">
                        <Form.Label>CIP Code
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                            value={formData.cip_code && formData.credential_level ? `${formData.cip_code}__${formData.credential_level}` : ''}
                            disabled={!schoolSelected && !isEdit}
                            onChange={(e) => {
                                const [cip_code, credential_level] = e.target.value.split('__');
                                const selected = cipOptions.find(
                                    (c) => c.cip_code === cip_code && String(c.credential_level) === credential_level
                                );
                                handleChange('cip_code', cip_code || null);
                                handleChange('cip_title', selected?.cip_title ?? null);
                                handleChange('credential_level', selected?.credential_level ?? null );
                                handleChange('credential_title', selected?.credential_title ?? null );
                            }}
                        >
                            <option value="">-- Select CIP Code --</option>
                            {cipOptions.map((c) => (
                               <option key={`${c.cip_code}-${c.credential_level}`} value={`${c.cip_code}__${c.credential_level}`}>
            {c.cip_code} — {c.cip_title} ({c.credential_title})
        </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* CIP Title — auto-filled */}
                    <Form.Group className="mb-3">
                        <Form.Label>CIP Title
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control type="text" value={formData.cip_title ?? ''} disabled />
                    </Form.Group>
                    {/* Credential Level — auto-filled */}
                    <Form.Group className="mb-3">
                        <Form.Label>Credential Level
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.credential_level ?? ''}
                            disabled
                        />
                    </Form.Group>
                    {/* Credential Title — auto-filled */}
                    <Form.Group className="mb-3">
                        <Form.Label>Credential Title
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.credential_title ?? ''}
                            disabled
                        />
                    </Form.Group>

                    {/* Grad Cohort */}
                    <Form.Group className="mb-3">
                        <Form.Label>Grad Cohort</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.grad_cohort ?? ''}
                            onChange={(e) => handleChange('grad_cohort', e.target.value)}
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
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose} disabled={loading}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Data'}
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

export default EditearningsagainstModal;
