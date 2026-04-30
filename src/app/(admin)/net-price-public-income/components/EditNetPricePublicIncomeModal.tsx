'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { NetPricePublicIncome } from '@/types/netPricePublicIncome';
import { toast } from 'react-toastify';

interface Props {
    show: boolean;
    onClose: () => void;
    data: NetPricePublicIncome | null;
    onSuccess: () => void;
}

const emptyNetPricePublicIncome: NetPricePublicIncome = {
    unitid: '',
    income_0_30000: null,
    income_0_48000: null,
    income_30001_48000: null,
    income_30001_75000: null,
    income_48001_75000: null,
    income_75001_110000: null,
    income_75000_plus: null,
    income_110001_plus: null,
};

const EditNetPricePublicIncomeModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<NetPricePublicIncome>(emptyNetPricePublicIncome);
    const [loading, setLoading] = useState(false);
    const [schoolResults, setSchoolResults] = useState<any[]>([]);
    const [searching, setSearching] = useState(false);
    const [unitidInput, setUnitidInput] = useState('');

    useEffect(() => {
        if (data) {
            setFormData(data);
            setUnitidInput(String(data.unitid ?? ''));
        } else {
            setFormData({ ...emptyNetPricePublicIncome });
            setUnitidInput('');
        }
    }, [data, show]);

    const handleChange = (key: keyof NetPricePublicIncome, value: any) => {
        setFormData(prev => ({
            ...(prev ?? emptyNetPricePublicIncome),
            [key]: value,
        }));
    };

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

    const handleSave = async () => {
        const unitid = String(formData.unitid).trim();

        if (!unitid) {
            toast.error('Unit ID is required');
            return;
        }

        if (!/^[0-9]{6}$/.test(unitid)) {
            toast.error('Unit ID must be exactly 6 digits');
            return;
        }

        try {
            setLoading(true);

            const isEdit = !!data;
            const url = isEdit ? `/api/net-price-public-income/${data?.unitid}` : '/api/net-price-public-income';
            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                toast.success(isEdit ? 'Net price public income updated successfully' : 'Net price public income added successfully');
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
                <Modal.Title>{data ? 'Edit Net Price Public Income Data' : 'Add Net Price Public Income Data'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
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
                        <Form.Label>Income 0-30000</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.income_0_30000 ?? ''}
                            onChange={(e) =>
                                handleChange('income_0_30000', e.target.value === '' ? null : Number(e.target.value))
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Income 0-48000</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.income_0_48000 ?? ''}
                            onChange={(e) =>
                                handleChange('income_0_48000', e.target.value === '' ? null : Number(e.target.value))
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Income 30001-48000</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.income_30001_48000 ?? ''}
                            onChange={(e) =>
                                handleChange('income_30001_48000', e.target.value === '' ? null : Number(e.target.value))
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Income 30001-75000</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.income_30001_75000 ?? ''}
                            onChange={(e) =>
                                handleChange('income_30001_75000', e.target.value === '' ? null : Number(e.target.value))
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Income 48001-75000</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.income_48001_75000 ?? ''}
                            onChange={(e) =>
                                handleChange('income_48001_75000', e.target.value === '' ? null : Number(e.target.value))
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Income 75001-110000</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.income_75001_110000 ?? ''}
                            onChange={(e) =>
                                handleChange('income_75001_110000', e.target.value === '' ? null : Number(e.target.value))
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Income 75000+</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.income_75000_plus ?? ''}
                            onChange={(e) =>
                                handleChange('income_75000_plus', e.target.value === '' ? null : Number(e.target.value))
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Income 110001+</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.income_110001_plus ?? ''}
                            onChange={(e) =>
                                handleChange('income_110001_plus', e.target.value === '' ? null : Number(e.target.value))
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
                    {loading ? 'Saving...' : data ? 'Update Record' : 'Create Record'}
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

export default EditNetPricePublicIncomeModal;
