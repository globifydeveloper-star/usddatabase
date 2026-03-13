'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Student } from '@/types/student';
import { toast } from 'react-toastify';

interface Props {
  show: boolean;
  onClose: () => void;
  data: Student | null;
  onSuccess: () => void;
}

const emptyStudent: Student = {
  id: 0,
  unitid: '',
  size: null,
  grad_students: null,
  enrollment_grad_12_month: null,
  enrollment_undergrad_12_month: null,
  fafsa_applications: null,
  demographics_men: null,
  demographics_women: null,
  faculty_men: null,
  faculty_women: null,
};

const EditStudentsModal = ({ show, onClose, data, onSuccess }: Props) => {
  const [formData, setFormData] = useState<Student>(emptyStudent);
  const [loading, setLoading] = useState(false);

  const [schoolResults, setSchoolResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData(data);
    } else {
      setFormData({ ...emptyStudent });
    }
  }, [data, show]);

  const handleChange = (
    key: keyof Student,
    value: string | number | null
  ) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
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
      console.error(err);
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
        ? `/api/students/${data?.unitid}`
        : `/api/students`;

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
            ? 'Student updated successfully'
            : 'Student created successfully'
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
          {data ? 'Edit Student Data' : 'Add Student Data'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
       <Form>

  {/* UNITID SEARCH */}
  <Form.Group className="mb-4 position-relative">
    <Form.Label className="fw-semibold">Unit ID</Form.Label>

    <Form.Control
      type="text"
      value={formData.unitid}
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

  {/* -------- BASIC NUMBERS -------- */}

  <Form.Group className="mb-3">
    <Form.Label>Size</Form.Label>
    <Form.Control
      type="number"
      min={0}
      value={formData.size ?? ''}
      onChange={(e) =>
        handleChange(
          'size',
          e.target.value === '' ? null : Number(e.target.value)
        )
      }
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Graduate Students</Form.Label>
    <Form.Control
      type="number"
      min={0}
      value={formData.grad_students ?? ''}
      onChange={(e) =>
        handleChange(
          'grad_students',
          e.target.value === '' ? null : Number(e.target.value)
        )
      }
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>FAFSA Applications</Form.Label>
    <Form.Control
      type="number"
      min={0}
      value={formData.fafsa_applications ?? ''}
      onChange={(e) =>
        handleChange(
          'fafsa_applications',
          e.target.value === '' ? null : Number(e.target.value)
        )
      }
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Enrollment Grad 12 Month</Form.Label>
    <Form.Control
      type="number"
      min={0}
      value={formData.enrollment_grad_12_month ?? ''}
      onChange={(e) =>
        handleChange(
          'enrollment_grad_12_month',
          e.target.value === '' ? null : Number(e.target.value)
        )
      }
    />
  </Form.Group>

  <Form.Group className="mb-4">
    <Form.Label>Enrollment Undergrad 12 Month</Form.Label>
    <Form.Control
      type="number"
      min={0}
      value={formData.enrollment_undergrad_12_month ?? ''}
      onChange={(e) =>
        handleChange(
          'enrollment_undergrad_12_month',
          e.target.value === '' ? null : Number(e.target.value)
        )
      }
    />
  </Form.Group>

  {/* -------- PERCENTAGE NUMERIC(6,4) -------- */}

  <hr className="my-4"/>

  <h6 className="fw-bold mb-3">Demographics</h6>

  <Form.Group className="mb-3">
    <Form.Label>Men</Form.Label>
    <Form.Control
      type="number"
      step="0.0001"
      min={0}
      max={1}
      value={formData.demographics_men ?? ''}
      onChange={(e) =>
        handleChange(
          'demographics_men',
          e.target.value === '' ? null : Number(e.target.value)
        )
      }
    />
  </Form.Group>

  <Form.Group className="mb-4">
    <Form.Label>Women</Form.Label>
    <Form.Control
      type="number"
      step="0.0001"
      min={0}
      max={1}
      value={formData.demographics_women ?? ''}
      onChange={(e) =>
        handleChange(
          'demographics_women',
          e.target.value === '' ? null : Number(e.target.value)
        )
      }
    />
  </Form.Group>

  <h6 className="fw-bold mb-3">Faculty</h6>

  <Form.Group className="mb-3">
    <Form.Label>Men</Form.Label>
    <Form.Control
      type="number"
      step="0.0001"
      min={0}
      max={1}
      value={formData.faculty_men ?? ''}
      onChange={(e) =>
        handleChange(
          'faculty_men',
          e.target.value === '' ? null : Number(e.target.value)
        )
      }
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Women</Form.Label>
    <Form.Control
      type="number"
      min={0}
      max={1}
      value={formData.faculty_women ?? ''}
      onChange={(e) =>
        handleChange(
          'faculty_women',
          e.target.value === '' ? null : Number(e.target.value)
        )
      }
    />
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
            ? 'Update Student'
            : 'Create Student'}
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

export default EditStudentsModal;