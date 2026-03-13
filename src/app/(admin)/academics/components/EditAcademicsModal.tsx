'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Academics } from '@/types/academics';
import { toast } from 'react-toastify';

interface Props {
  show: boolean;
  onClose: () => void;
  data: Academics | null;
  onSuccess: () => void;
}

const emptyAcademics: Academics = {
  unitid: null,
  assoc: null,
  degree: null,
  bachelors: null,
  certificate_lt_1yr: null,
  certificate_lt_2yr: null,
  certificate_lt_4yr: null,
  degree_or_certificate: null,
};

const boolToSelect = (val: boolean | null) =>
  val === null ? '' : val ? 'yes' : 'no';

const selectToBool = (val: string) =>
  val === '' ? null : val === 'yes';

const EditAcademicsModal = ({ show, onClose, data, onSuccess }: Props) => {
  const [formData, setFormData] = useState<Academics>(emptyAcademics);
  const [loading, setLoading] = useState(false);
const [unitidInput, setUnitidInput] = useState('');
  const [schoolResults, setSchoolResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

 useEffect(() => {
  if (data) {
    setFormData(data);
    setUnitidInput(String(data.unitid ?? ''));
  } else {
    setFormData({ ...emptyAcademics });
    setUnitidInput('');
  }
}, [data, show]);

  const handleChange = (
    key: keyof Academics,
    value: number | boolean | null
  ) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  /* -------- SCHOOL SEARCH -------- */

  const searchSchools = async (value: string) => {
  setUnitidInput(value); // ← track raw text separately

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
    handleChange('unitid', school.unitid);
    setUnitidInput(String(school.unitid));
    setSchoolResults([]);
  };

  /* -------- SAVE -------- */

  const handleSave = async () => {
    if (!formData.unitid) {
      toast.error('Unit ID is required');
      return;
    }

    if (!/^\d{6}$/.test(String(formData.unitid))) {
      toast.error('Unit ID must be exactly 6 digits');
      return;
    }

    try {
      setLoading(true);

      const isEdit = !!data;

      const url = isEdit
        ? `/api/academics/${data?.unitid}`
        : `/api/academics`;

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
            ? 'Academics updated successfully'
            : 'Academics created successfully'
        );

        onSuccess();
        onClose();
      } else {
        toast.error(result.message || 'Save failed');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {data ? 'Edit Academics Data' : 'Add Academics Data'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          {/* UNITID SEARCH */}
          <Form.Group className="mb-4 position-relative">
            <Form.Label className="fw-semibold">Unit ID</Form.Label>

            <Form.Control
              type="text"
             value={unitidInput}   // ← was formData.unitid
              disabled={!!data}
              onChange={(e) => searchSchools(e.target.value)}
              placeholder="Search Unit ID or School Name"
            />

            {searching && (
              <small className="text-muted">Searching...</small>
            )}

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

          {/* BOOLEAN FIELDS */}

          <Form.Group className="mb-3">
            <Form.Label>Assoc</Form.Label>
            <Form.Select
              value={boolToSelect(formData.assoc)}
              onChange={(e) =>
                handleChange('assoc', selectToBool(e.target.value))
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Degree</Form.Label>
            <Form.Select
              value={boolToSelect(formData.degree)}
              onChange={(e) =>
                handleChange('degree', selectToBool(e.target.value))
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bachelors</Form.Label>
            <Form.Select
              value={boolToSelect(formData.bachelors)}
              onChange={(e) =>
                handleChange('bachelors', selectToBool(e.target.value))
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Certificate &lt; 1 Year</Form.Label>
            <Form.Select
              value={boolToSelect(formData.certificate_lt_1yr)}
              onChange={(e) =>
                handleChange(
                  'certificate_lt_1yr',
                  selectToBool(e.target.value)
                )
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Certificate &lt; 2 Years</Form.Label>
            <Form.Select
              value={boolToSelect(formData.certificate_lt_2yr)}
              onChange={(e) =>
                handleChange(
                  'certificate_lt_2yr',
                  selectToBool(e.target.value)
                )
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Certificate &lt; 4 Years</Form.Label>
            <Form.Select
              value={boolToSelect(formData.certificate_lt_4yr)}
              onChange={(e) =>
                handleChange(
                  'certificate_lt_4yr',
                  selectToBool(e.target.value)
                )
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Degree or Certificate</Form.Label>
            <Form.Select
              value={boolToSelect(formData.degree_or_certificate)}
              onChange={(e) =>
                handleChange(
                  'degree_or_certificate',
                  selectToBool(e.target.value)
                )
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>

        <Button variant="primary" onClick={handleSave} disabled={loading}>
          {loading
            ? 'Saving...'
            : data
            ? 'Update Academics'
            : 'Create Academics'}
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

export default EditAcademicsModal;