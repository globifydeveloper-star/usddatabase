'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Roi } from '../../../../types/roi';
import { toast } from 'react-toastify';

interface Props {
  show: boolean;
  onClose: () => void;
  data: Roi | null;
  onSuccess: () => void;
}

const emptyRoi: Roi = {
  unitid: '',
  avg_salary: null,
  total_cost: null,
  roi_20yr: null,
  credential_level: null,
};

const parseNumber = (value: string) => (value === '' ? null : Number(value));

const EditRoiModal = ({ show, onClose, data, onSuccess }: Props) => {
  const [formData, setFormData] = useState<Roi>(emptyRoi);
  const [loading, setLoading] = useState(false);
  const [unitidInput, setUnitidInput] = useState('');
  const [schoolResults, setSchoolResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData(data);
      setUnitidInput(String(data.unitid ?? ''));
    } else {
      setFormData({ ...emptyRoi });
      setUnitidInput('');
    }
  }, [data, show]);

  const handleChange = (key: keyof Roi, value: string | number | null) => {
    setFormData((prev: Roi | null) => ({
      ...(prev ?? emptyRoi),
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

  const handleSave = async () => {
    const unitid = formData.unitid.trim();

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
      const url = isEdit ? `/api/roi/${data?.unitid}` : `/api/roi`;
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(isEdit ? 'ROI updated successfully' : 'ROI created successfully');
        onSuccess();
        onClose();
      } else {
        toast.error(result.message || 'Save failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{data ? 'Edit ROI' : 'Add ROI'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
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
            <Form.Label>Average Salary</Form.Label>
            <Form.Control
              type="number"
              value={formData.avg_salary ?? ''}
              onChange={(e) => handleChange('avg_salary', parseNumber(e.target.value))}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Credential Level</Form.Label>
            <Form.Control
              type="text"
              value={formData.credential_level ?? ''}
              onChange={(e) => handleChange('credential_level', e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Total Cost</Form.Label>
            <Form.Control
              type="number"
              value={formData.total_cost ?? ''}
              onChange={(e) => handleChange('total_cost', parseNumber(e.target.value))}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ROI 20-YR</Form.Label>
            <Form.Control
              type="number"
              value={formData.roi_20yr ?? ''}
              onChange={(e) => handleChange('roi_20yr', parseNumber(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : data ? 'Update ROI' : 'Create ROI'}
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

export default EditRoiModal;
