'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Costs } from '@/types/costs';
import { toast } from 'react-toastify';

interface Props {
    show: boolean;
    onClose: () => void;
    data: Costs | null;
    onSuccess: () => void;
}

const emptyCosts: Costs = {
    unitid: '',
    booksupply: null,
    tuition_in_state: null,
    tuition_out_state: null,
    tuition_program_year: null,
    roomboard_oncampus: null,
    roomboard_offcampus: null,
    avg_net_price_public: null,
    avg_net_price_private: null,
    avg_net_price_overall: null,
    otherexpense_oncampus: null,
    otherexpense_offcampus: null,
    otherexpense_withfamily: null,
    for_roi_data: null,
};

const EditCostsModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<Costs>(emptyCosts);
    const [loading, setLoading] = useState(false);
    const [schoolResults, setSchoolResults] = useState<any[]>([]);
    const [searching, setSearching] = useState(false);
    const [unitidInput, setUnitidInput] = useState('');

    useEffect(() => {
        if (data) {
            setFormData(data);
            setUnitidInput(String(data.unitid ?? ''));
        } else {
            setFormData({ ...emptyCosts });
            setUnitidInput('');
        }
    }, [data, show]);

    const handleChange = (key: keyof Costs, value: any) => {
        setFormData((prev) => ({
            ...(prev ?? emptyCosts),
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

    const selectSchool = (school: any) => {
        handleChange('unitid', String(school.unitid));
        setUnitidInput(String(school.unitid));
        setSchoolResults([]);
    };

    /* -------- SAVE -------- */

    const handleSave = async () => {
        const unitid = String(formData.unitid).trim();

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
            const url = isEdit ? `/api/costs/${data?.unitid}` : `/api/costs`;
            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                toast.success(
                    isEdit ? 'Cost data updated successfully' : 'Cost data added successfully'
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
                <Modal.Title>{data ? 'Edit Costs Data' : 'Add Costs Data'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
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

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Book Supply<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.booksupply ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'booksupply',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Tuition (In State)<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.tuition_in_state ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'tuition_in_state',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Tuition (Out of State)<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.tuition_out_state ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'tuition_out_state',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tuition (Program Year)</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.tuition_program_year ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'tuition_program_year',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Room & Board (On Campus)
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.roomboard_oncampus ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'roomboard_oncampus',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Room & Board (Off Campus)
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.roomboard_offcampus ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'roomboard_offcampus',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Avg Net Price (Public)</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.avg_net_price_public ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'avg_net_price_public',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Avg Net Price (Private)</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.avg_net_price_private ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'avg_net_price_private',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Avg Net Price (Overall)</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.avg_net_price_overall ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'avg_net_price_overall',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Other Expense (On Campus)
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.otherexpense_oncampus ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'otherexpense_oncampus',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Other Expense (Off Campus)
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.otherexpense_offcampus ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'otherexpense_offcampus',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Other Expense (With Family)</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.otherexpense_withfamily ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'otherexpense_withfamily',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>For ROI Data</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.for_roi_data ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'for_roi_data',
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
                    {loading ? 'Saving...' : data ? 'Update Costs' : 'Create Costs'}
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

export default EditCostsModal;
