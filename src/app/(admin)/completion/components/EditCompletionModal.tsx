'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Completion } from '@/types/completion';
import { toast } from 'react-toastify';

interface Props {
  show: boolean;
  onClose: () => void;
  data: Completion | null;
  onSuccess: () => void;
}

const emptyCompletion: Completion = {
    unitid: '',
    completed_2yrs: null,
    completed_3yrs: null,
    completed_4yrs: null,
    completed_6yrs: null,
    id: 0
};

const EditCompletionModal = ({ show, onClose, data, onSuccess }: Props) => {

  const [formData, setFormData] = useState<Completion>(emptyCompletion);
  const [loading, setLoading] = useState(false);

  const [schoolResults, setSchoolResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData(data);
    } else {
      setFormData({ ...emptyCompletion });
    }
  }, [data, show]);

  const handleChange = (
    key: keyof Completion,
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
        ? `/api/completion/${data?.unitid}`
        : `/api/completion`;

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
            ? 'Completion updated successfully'
            : 'Completion created successfully'
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
          {data ? 'Edit Completion Data' : 'Add Completion Data'}
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

          <Form.Group className="mb-3">
            <Form.Label>Completed in 2 Years</Form.Label>
            <Form.Control
              type="number"
              step="0.0001"
              min={0}
              max={1}
              value={formData.completed_2yrs ?? ''}
              onChange={(e) =>
                handleChange(
                  'completed_2yrs',
                  e.target.value === '' ? null : Number(e.target.value)
                )
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Completed in 3 Years</Form.Label>
            <Form.Control
              type="number"
              step="0.0001"
              min={0}
              max={1}
              value={formData.completed_3yrs ?? ''}
              onChange={(e) =>
                handleChange(
                  'completed_3yrs',
                  e.target.value === '' ? null : Number(e.target.value)
                )
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Completed in 4 Years</Form.Label>
            <Form.Control
              type="number"
              step="0.0001"
              min={0}
              max={1}
              value={formData.completed_4yrs ?? ''}
              onChange={(e) =>
                handleChange(
                  'completed_4yrs',
                  e.target.value === '' ? null : Number(e.target.value)
                )
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Completed in 6 Years</Form.Label>
            <Form.Control
              type="number"
              step="0.0001"
              min={0}
              max={1}
              value={formData.completed_6yrs ?? ''}
              onChange={(e) =>
                handleChange(
                  'completed_6yrs',
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
            ? 'Update Completion'
            : 'Create Completion'}
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

export default EditCompletionModal;