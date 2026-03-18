'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Repayment } from '@/types/repayment';
import { toast } from 'react-toastify';

interface Props {
    show: boolean;
    onClose: () => void;
    data: Repayment | null;
    onSuccess: () => void;
}
const emptyRepayment: Repayment = {
    unitid: '',
    yr1_completers: null,
    yr1_overall: null,
    yr1_noncompleters: null,
    yr3_completers: null,
    yr3_noncompleters: null,
    yr3_overall: null,
};

const EditRepaymentModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<Repayment>(emptyRepayment);
    const [loading, setLoading] = useState(false);
    const [schoolResults, setSchoolResults] = useState<any[]>([]);
    const [searching, setSearching] = useState(false);
    const [unitidInput, setUnitidInput] = useState('');

    // Set selected row data
    useEffect(() => {
        if (data) {
            setFormData(data);
            setUnitidInput(String(data.unitid ?? ''));
        } else {
            setFormData({ ...emptyRepayment });
            setUnitidInput('');
        }
    }, [data, show]);

    const handleChange = (key: keyof Repayment, value: string | boolean | number | null) => {
        setFormData((prev) => ({
            ...(prev ?? emptyRepayment),
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
            const url = isEdit ? `/api/repayment/${data?.unitid}` : `/api/repayment`;
            const method = isEdit ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                toast.success(isEdit ? 'Repayment record updated' : 'Repayment record created');
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

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{data ? 'Edit Repayment' : 'Add Repayment'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Unit ID (Primary Key - Disabled) */}
                    {/* UNITID SEARCH */}
                    <Form.Group className="mb-4 position-relative">
                        <Form.Label className="fw-semibold">Unit ID</Form.Label>
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

export default EditRepaymentModal;
