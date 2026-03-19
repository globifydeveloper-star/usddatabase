'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Aid } from '@/types/aid';
import { toast } from 'react-toastify';

interface Props {
    show: boolean;
    onClose: () => void;
    data: Aid | null;
    onSuccess: () => void;
}

const emptyAid: Aid = {
    unitid: '',
    loan_principal: null,
    pell_grant_rate: null,
    federal_loan_rate: null,
    students_with_any_loan: null,
};

const EditAidModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<Aid>(emptyAid);
    const [loading, setLoading] = useState(false);
    const [schoolResults, setSchoolResults] = useState<any[]>([]);
    const [searching, setSearching] = useState(false);
    const [unitidInput, setUnitidInput] = useState('');

    useEffect(() => {
        if (data) {
            setFormData(data);
            setUnitidInput(String(data.unitid ?? ''));
        } else {
            setFormData({ ...emptyAid });
            setUnitidInput('');
        }
    }, [data, show]);

    const handleChange = (key: keyof Aid, value: any) => {
        setFormData((prev) => ({
            ...(prev ?? emptyAid),
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
            const data = await res.json();
            setSchoolResults(data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setSearching(false);
        }
    };

    const selectSchool = (school: any) => {
        handleChange('unitid', String(school.unitid));
        setUnitidInput(String(school.unitid));
        setSchoolResults([]);
    };

    /* -------- SAVE -------- */

    const handleSave = async () => {
        const unitid = formData.unitid.trim();

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
            const url = isEdit ? `/api/aid/${data?.unitid}` : `/api/aid`;
            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                toast.success(
                    isEdit ? 'Aid data updated successfully' : 'Aid data added successfully'
                );
                onSuccess();
                onClose();
            } else {
                toast.error(result.message || 'Save failed');
            }
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
                <Modal.Title>{data ? 'Edit Aid Data' : 'Add Aid Data'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* UNITID SEARCH */}
                    <Form.Group className="mb-4 position-relative">
                        <Form.Label className="fw-semibold">
                            Unit ID
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={unitidInput}
                            disabled={!!data}
                            onChange={(e) => searchSchools(e.target.value)}
                            placeholder="Search Unit ID or School Name"
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

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Loan Principal
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.loan_principal ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'loan_principal',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Pell Grant Rate
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.0001"
                            value={formData.pell_grant_rate ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'pell_grant_rate',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Federal Loan Rate
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.0001"
                            value={formData.federal_loan_rate ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'federal_loan_rate',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Students With Any Loan
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.0001"
                            value={formData.students_with_any_loan ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'students_with_any_loan',
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
                    {loading ? 'Saving...' : data ? 'Update Aid' : 'Create Aid'}
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

export default EditAidModal;
