'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Academics } from '@/types/academics';

// export interface Academics {
//   unitid: number;
//   assoc: boolean | null;
//   degree: boolean | null;
//   bachelors: boolean | null;
//   certificate_lt_1yr: boolean | null;
//   certificate_lt_2yr: boolean | null;
//   certificate_lt_4yr: boolean | null;
//   degree_or_certificate: boolean | null;
// }

interface Props {
    show: boolean;
    onClose: () => void;
    data: Academics | null;
    onSuccess: () => void;
}

const EditAcademicsModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<Academics | null>(null);
    const [loading, setLoading] = useState(false);

    // Set selected row data
    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleChange = (key: keyof Academics, value: string | boolean | number | null) => {
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

            const response = await fetch(`/api/academics/${formData.unitid}`, {
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
                <Modal.Title>Edit Academics Data</Modal.Title>
            </Modal.Header>

            <Modal.Body>
               <Form>
  {/* Unit ID */}
  <Form.Group className="mb-3">
    <Form.Label>Unit ID</Form.Label>
    <Form.Control type="text" value={formData.unitid} disabled />
  </Form.Group>

  {/* assoc */}
  <Form.Group className="mb-3">
    <Form.Label>Assoc</Form.Label>
    <Form.Select
      value={formData.assoc === null ? '' : formData.assoc ? 'yes' : 'no'}
      onChange={(e) =>
        handleChange(
          'assoc',
          e.target.value === '' ? null : e.target.value === 'yes'
        )
      }
    >
      <option value="">Select</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </Form.Select>
  </Form.Group>

  {/* degree */}
  <Form.Group className="mb-3">
    <Form.Label>Degree</Form.Label>
    <Form.Select
      value={formData.degree === null ? '' : formData.degree ? 'yes' : 'no'}
      onChange={(e) =>
        handleChange(
          'degree',
          e.target.value === '' ? null : e.target.value === 'yes'
        )
      }
    >
      <option value="">Select</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </Form.Select>
  </Form.Group>

  {/* bachelors */}
  <Form.Group className="mb-3">
    <Form.Label>Bachelors</Form.Label>
    <Form.Select
      value={formData.bachelors === null ? '' : formData.bachelors ? 'yes' : 'no'}
      onChange={(e) =>
        handleChange(
          'bachelors',
          e.target.value === '' ? null : e.target.value === 'yes'
        )
      }
    >
      <option value="">Select</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </Form.Select>
  </Form.Group>

  {/* certificate_lt_1yr */}
  <Form.Group className="mb-3">
    <Form.Label>Certificate &lt; 1 Year</Form.Label>
    <Form.Select
      value={
        formData.certificate_lt_1yr === null
          ? ''
          : formData.certificate_lt_1yr
          ? 'yes'
          : 'no'
      }
      onChange={(e) =>
        handleChange(
          'certificate_lt_1yr',
          e.target.value === '' ? null : e.target.value === 'yes'
        )
      }
    >
      <option value="">Select</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </Form.Select>
  </Form.Group>

  {/* certificate_lt_2yr */}
  <Form.Group className="mb-3">
    <Form.Label>Certificate &lt; 2 Years</Form.Label>
    <Form.Select
      value={
        formData.certificate_lt_2yr === null
          ? ''
          : formData.certificate_lt_2yr
          ? 'yes'
          : 'no'
      }
      onChange={(e) =>
        handleChange(
          'certificate_lt_2yr',
          e.target.value === '' ? null : e.target.value === 'yes'
        )
      }
    >
      <option value="">Select</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </Form.Select>
  </Form.Group>

  {/* certificate_lt_4yr */}
  <Form.Group className="mb-3">
    <Form.Label>Certificate &lt; 4 Years</Form.Label>
    <Form.Select
      value={
        formData.certificate_lt_4yr === null
          ? ''
          : formData.certificate_lt_4yr
          ? 'yes'
          : 'no'
      }
      onChange={(e) =>
        handleChange(
          'certificate_lt_4yr',
          e.target.value === '' ? null : e.target.value === 'yes'
        )
      }
    >
      <option value="">Select</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </Form.Select>
  </Form.Group>

  {/* degree_or_certificate */}
  <Form.Group className="mb-3">
    <Form.Label>Degree or Certificate</Form.Label>
    <Form.Select
      value={
        formData.degree_or_certificate === null
          ? ''
          : formData.degree_or_certificate
          ? 'yes'
          : 'no'
      }
      onChange={(e) =>
        handleChange(
          'degree_or_certificate',
          e.target.value === '' ? null : e.target.value === 'yes'
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

export default EditAcademicsModal;
