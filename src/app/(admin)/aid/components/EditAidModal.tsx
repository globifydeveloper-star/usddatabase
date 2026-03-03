'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

interface Aid {
  unitid: string;
  loan_principal: string | null;
  pell_grant_rate: string | null;
  federal_loan_rate: string | null;
  students_with_any_loan: string | null;
}

interface Props {
  show: boolean;
  onClose: () => void;
  data: Aid | null;
  onSuccess: () => void;
}

const EditAidModal = ({ show, onClose, data, onSuccess }: Props) => {
  const [formData, setFormData] = useState<Aid | null>(null);
  const [loading, setLoading] = useState(false);

  // Set selected row data
  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (key: keyof Aid, value: any) => {
    if (!formData) return;

    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSave = async () => {
    if (!formData) return;

    try {
      setLoading(true);

      const response = await fetch(`/api/aid/${formData.unitid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        alert(result.message || 'Update failed');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return null;

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Aid Data</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Unit ID (Primary Key - Disabled) */}
          <Form.Group className="mb-3">
            <Form.Label>Unit ID</Form.Label>
            <Form.Control
              type="text"
              value={formData.unitid}
              disabled
            />
          </Form.Group>

          {/* Loan Principal */}
          <Form.Group className="mb-3">
            <Form.Label>Loan Principal</Form.Label>
            <Form.Control
              type="number"
              value={formData.loan_principal ?? ''}
              onChange={(e) =>
                handleChange('loan_principal', e.target.value)
              }
            />
          </Form.Group>

          {/* Pell Grant Rate */}
          <Form.Group className="mb-3">
            <Form.Label>Pell Grant Rate</Form.Label>
            <Form.Control
              type="number"
              step="0.0001"
              value={formData.pell_grant_rate ?? ''}
              onChange={(e) =>
                handleChange('pell_grant_rate', e.target.value)
              }
            />
          </Form.Group>

          {/* Federal Loan Rate */}
          <Form.Group className="mb-3">
            <Form.Label>Federal Loan Rate</Form.Label>
            <Form.Control
              type="number"
              step="0.0001"
              value={formData.federal_loan_rate ?? ''}
              onChange={(e) =>
                handleChange('federal_loan_rate', e.target.value)
              }
            />
          </Form.Group>

          {/* Students With Any Loan */}
          <Form.Group className="mb-3">
            <Form.Label>Students With Any Loan</Form.Label>
            <Form.Control
              type="number"
              step="0.0001"
              value={formData.students_with_any_loan ?? ''}
              onChange={(e) =>
                handleChange('students_with_any_loan', e.target.value)
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
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAidModal;