'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Admissions } from '@/types/admissions';
import { toast } from 'react-toastify';

interface Props {
    show: boolean;
    onClose: () => void;
    data: Admissions | null;
    onSuccess: () => void;
}

const emptyAdmission: Admissions = {
    unitid: '',
    test_requirements: null,
    admission_rate: null,
    sat_avg_overall: null,
    sat_mid_math: null,
    sat_mid_reading: null,
    sat_p25_reading: null,
    sat_p25_math: null,
    sat_p25_writing: null,
    sat_p75_reading: null,
    sat_p75_math: null,
    sat_p75_writing: null,
    sat_rw_min: null,
    sat_rw_max: null,
    sat_math_min: null,
    sat_math_max: null,
    sat_min_and_max_value: null,
};

const EditAdmissionsModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<Admissions>(emptyAdmission);
    const [loading, setLoading] = useState(false);

    const [schoolResults, setSchoolResults] = useState<any[]>([]);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        if (data) {
            setFormData({
                unitid: data.unitid,
                test_requirements: data.test_requirements,
                admission_rate: data.admission_rate,
                sat_avg_overall: data.sat_avg_overall,
                sat_mid_math: data.sat_mid_math,
                sat_mid_reading: data.sat_mid_reading,
                sat_p25_reading: data.sat_p25_reading,
                sat_p25_math: data.sat_p25_math,
                sat_p25_writing: data.sat_p25_writing,
                sat_p75_reading: data.sat_p75_reading,
                sat_p75_math: data.sat_p75_math,
                sat_p75_writing: data.sat_p75_writing,
                sat_rw_min: data.sat_rw_min,
                sat_rw_max: data.sat_rw_max,
                sat_math_min: data.sat_math_min,
                sat_math_max: data.sat_math_max,
                sat_min_and_max_value: data.sat_min_and_max_value,
            });
        } else {
            setFormData({ ...emptyAdmission });
        }
    }, [data, show]);

    const handleChange = (key: keyof Admissions, value: string | number | null) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    /* -------- SCHOOL SEARCH -------- */

    const searchSchools = async (value: string) => {
        handleChange('unitid', value);

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
            console.error('School search failed', err);
        } finally {
            setSearching(false);
        }
    };

    const selectSchool = (school: any) => {
        handleChange('unitid', school.unitid);
        setSchoolResults([]);
    };

    /* -------- SAVE -------- */

    const handleSave = async () => {
        const unitid = formData.unitid.trim();

        // UNITID validation
        if (!unitid) {
            toast.error('Unit ID is required');
            return;
        }

        if (!/^\d{6}$/.test(unitid)) {
            toast.error('Unit ID must be exactly 6 digits');
            return;
        }

        // TEST REQUIREMENTS validation
        if (
            formData.test_requirements !== null &&
            (formData.test_requirements < 1 || formData.test_requirements > 6)
        ) {
            toast.error('Test Requirements must be between 1 and 6');
            return;
        }

        try {
            setLoading(true);

            const isEdit = !!data;

            const url = isEdit ? `/api/admissions/${data?.unitid}` : `/api/admissions`;
            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                toast.success(
                    isEdit ? 'Admission updated successfully' : 'Admission created successfully'
                );
                onSuccess();
                onClose();
            } else {
                toast.error(result.message || 'Save failed');
            }
        } catch (error) {
            console.error('Save admission error:', error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{data ? 'Edit Admission Data' : 'Add Admission Data'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* UNITID SEARCH */}
                    <Form.Group className="mb-3 position-relative">
                        <Form.Label>
                            Unit ID
                            <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                            type="text"
                            value={formData.unitid}
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

                    {/* TEST REQUIREMENTS */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Test Requirements
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.test_requirements ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'test_requirements',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    {/* ADMISSION RATE */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Admission Rate <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={formData.admission_rate ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'admission_rate',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>
                    {/* SAT AVERAGE OVERALL */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Sat Average Overall <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={formData.sat_avg_overall ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'sat_avg_overall',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>
                    {/*SAT MID-MATH */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Sat Mid Math <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={formData.sat_mid_math ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'sat_mid_math',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>

                    {/* SAT MID READING */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Sat Mid Reading <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={formData.sat_mid_reading ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'sat_mid_reading',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>
                    {/* SAT P25 READING */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Sat P25 Reading <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={formData.sat_p25_reading ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'sat_p25_reading',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>
                    {/* SAT P25 MATH */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Sat P25 Math <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={formData.sat_p25_math ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'sat_p25_math',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>
                    {/* SAT P25 WRITING */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Sat P25 Writing <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={formData.sat_p25_writing ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'sat_p25_writing',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>
                    {/* SAT P75 READING */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Sat P75 Reading <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={formData.sat_p75_reading ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'sat_p75_reading',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>
                    {/* SAT P75 MATH */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Sat P75 Math <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={formData.sat_p75_math ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'sat_p75_math',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>
                    {/* SAT P75 WRITING */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Sat P75 Writing <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={formData.sat_p75_writing ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'sat_p75_writing',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Sat RW Min <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={formData.sat_rw_min ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'sat_rw_min',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>
                    {/* SAT RW MAX */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Sat RW Max <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={formData.sat_rw_max ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'sat_rw_max',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>
                    {/* SAT MATH MIN */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Sat Math Min <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={formData.sat_math_min ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'sat_math_min',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>
                    {/* SAT MATH MAX */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Sat Math Max <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={formData.sat_math_max ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'sat_math_max',
                                    e.target.value === '' ? null : Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>
                    {/* SAT MIN AND MAX VALUE - JSONB */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            SAT Min and Max Value (JSON)
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={
                                formData.sat_min_and_max_value
                                    ? JSON.stringify(formData.sat_min_and_max_value, null, 2)
                                    : ''
                            }
                            onChange={(e) => {
                                try {
                                    const value = e.target.value.trim();
                                    if (value === '') {
                                        handleChange('sat_min_and_max_value', null);
                                    } else {
                                        handleChange('sat_min_and_max_value', JSON.parse(value));
                                    }
                                } catch (err) {
                                    console.warn('Invalid JSON');
                                }
                            }}
                            placeholder='{"key": "value"}'
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>

                <Button variant="primary" onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : data ? 'Update Admission' : 'Create Admission'}
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

export default EditAdmissionsModal;
