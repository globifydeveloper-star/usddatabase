'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { DebtIncomeRatio } from '@/types/debtIncomeRatio';
import { toast } from 'react-toastify';

interface Props {
  show: boolean;
  onClose: () => void;
  data: DebtIncomeRatio | null;
  onSuccess: () => void;
}

const emptyDebtIncomeRatio: DebtIncomeRatio = {
  unitid: '',
  avg_debt: null,
  avg_income: null,
  debt_income_ratio: null,
  ratio_text: null,
};

const EditDebtIncomeRatioModal = ({ show, onClose, data, onSuccess }: Props) => {
  const [formData, setFormData] = useState<DebtIncomeRatio>(emptyDebtIncomeRatio);
  const [loading, setLoading] = useState(false);
  const [schoolResults, setSchoolResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [unitidInput, setUnitidInput] = useState('');

  useEffect(() => {
    if (data) {
      setFormData(data);
      setUnitidInput(String(data.unitid ?? ''));
    } else {
      setFormData({ ...emptyDebtIncomeRatio });
      setUnitidInput('');
    }
  }, [data, show]);

  const handleChange = (key: keyof DebtIncomeRatio, value: any) => {
    setFormData((prev) => ({
      ...(prev ?? emptyDebtIncomeRatio),
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
      const url = isEdit ? `/api/debt-income-ratio/${data?.unitid}` : '/api/debt-income-ratio';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(isEdit ? 'Debt income ratio updated successfully' : 'Debt income ratio added successfully');
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
        <Modal.Title>{data ? 'Edit Debt Income Ratio Data' : 'Add Debt Income Ratio Data'}</Modal.Title>
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
            <Form.Label>Average Debt</Form.Label>
            <Form.Control
              type="number"
              value={formData.avg_debt ?? ''}
              onChange={(e) =>
                handleChange('avg_debt', e.target.value === '' ? null : Number(e.target.value))
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Average Income</Form.Label>
            <Form.Control
              type="number"
              value={formData.avg_income ?? ''}
              onChange={(e) =>
                handleChange('avg_income', e.target.value === '' ? null : Number(e.target.value))
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Debt Income Ratio</Form.Label>
            <Form.Control
              type="number"
              value={formData.debt_income_ratio ?? ''}
              onChange={(e) =>
                handleChange('debt_income_ratio', e.target.value === '' ? null : Number(e.target.value))
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ratio Text</Form.Label>
            <Form.Control
              type="text"
              value={formData.ratio_text ?? ''}
              onChange={(e) => handleChange('ratio_text', e.target.value)}
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

export default EditDebtIncomeRatioModal;
