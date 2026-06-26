'use client';

import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

/**
 * Reusable, schema-driven CRUD modal.
 *
 * Build a modal component for any table with `makeCrudModal(config)` and pass
 * the result to `CrudConfig.modalComponent`. Avoids duplicating a bespoke
 * modal per table — all inputs are derived from the field definitions.
 */

export type FieldType =
  | 'text'
  | 'number'
  | 'textarea'
  | 'switch'
  | 'json'
  | 'datetime'
  | 'fk-school' // autocomplete against /api/schools/search -> sets `unitid`
  | 'fk-program'; // autocomplete against /api/programs/search -> sets `program_id`

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  disabledOnEdit?: boolean;
  full?: boolean; // span full width row
}

export interface CrudModalConfig {
  title: string;
  apiEndpoint: string;
  fields: FieldDef[];
  // path segment for PUT/DELETE; defaults to data.id
  buildItemPath?: (data: any) => string;
}

interface Props {
  show: boolean;
  onClose: () => void;
  data: any | null;
  onSuccess: () => void;
}

const parseNumber = (value: string) => (value === '' ? null : Number(value));

function FkSearch({
  endpoint,
  valueLabel,
  disabled,
  onSelect,
  render,
  placeholder,
}: {
  endpoint: string;
  valueLabel: string;
  disabled?: boolean;
  onSelect: (item: any) => void;
  render: (item: any) => React.ReactNode;
  placeholder: string;
}) {
  const [input, setInput] = useState(valueLabel);
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setInput(valueLabel);
  }, [valueLabel]);

  const search = async (value: string) => {
    setInput(value);
    if (value.length < 2) {
      setResults([]);
      return;
    }
    try {
      setSearching(true);
      const res = await fetch(`${endpoint}?q=${encodeURIComponent(value)}`);
      const json = await res.json();
      setResults(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="position-relative">
      <Form.Control
        type="text"
        value={input}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => search(e.target.value)}
      />
      {searching && <small className="text-muted">Searching...</small>}
      {results.length > 0 && (
        <div className="crud-autocomplete-box">
          {results.map((item, i) => (
            <div
              key={i}
              className="crud-autocomplete-item"
              onClick={() => {
                onSelect(item);
                setResults([]);
              }}
            >
              {render(item)}
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        .crud-autocomplete-box {
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
        .crud-autocomplete-item {
          padding: 8px 10px;
          cursor: pointer;
        }
        .crud-autocomplete-item:hover {
          background: #1f2937;
        }
      `}</style>
    </div>
  );
}

export function makeCrudModal(config: CrudModalConfig) {
  const empty: Record<string, any> = {};
  config.fields.forEach((f) => {
    empty[f.key] = f.type === 'switch' ? false : null;
  });

  const CrudFormModal = ({ show, onClose, data, onSuccess }: Props) => {
    const [formData, setFormData] = useState<Record<string, any>>({ ...empty });
    const [loading, setLoading] = useState(false);
    const isEdit = !!data;

    useEffect(() => {
      setFormData(data ? { ...empty, ...data } : { ...empty });
    }, [data, show]);

    const handleChange = (key: string, value: any) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
      // Required-field validation
      for (const f of config.fields) {
        if (f.required) {
          const v = formData[f.key];
          if (v === null || v === undefined || v === '') {
            toast.error(`${f.label} is required`);
            return;
          }
        }
      }

      // Serialize JSON fields back to objects if user typed JSON text
      const payload: Record<string, any> = { ...formData };
      for (const f of config.fields) {
        if (f.type === 'json' && typeof payload[f.key] === 'string') {
          try {
            payload[f.key] = payload[f.key] === '' ? null : JSON.parse(payload[f.key]);
          } catch {
            toast.error(`${f.label} is not valid JSON`);
            return;
          }
        }
      }

      try {
        setLoading(true);
        const url = isEdit
          ? `${config.apiEndpoint}/${
              config.buildItemPath ? config.buildItemPath(data) : data.id
            }`
          : config.apiEndpoint;
        const method = isEdit ? 'PUT' : 'POST';

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const result = await response.json();

        if (result.success) {
          toast.success(isEdit ? 'Updated successfully' : 'Created successfully');
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

    const renderField = (f: FieldDef) => {
      const disabled = isEdit && f.disabledOnEdit;
      const value = formData[f.key];

      switch (f.type) {
        case 'switch':
          return (
            <Form.Check
              type="switch"
              checked={!!value}
              disabled={disabled}
              onChange={(e) => handleChange(f.key, e.target.checked)}
              label={value ? 'Yes' : 'No'}
            />
          );
        case 'textarea':
          return (
            <Form.Control
              as="textarea"
              rows={3}
              value={value ?? ''}
              disabled={disabled}
              onChange={(e) => handleChange(f.key, e.target.value === '' ? null : e.target.value)}
            />
          );
        case 'json':
          return (
            <Form.Control
              as="textarea"
              rows={4}
              value={
                value === null || value === undefined
                  ? ''
                  : typeof value === 'string'
                    ? value
                    : JSON.stringify(value, null, 2)
              }
              disabled={disabled}
              onChange={(e) => handleChange(f.key, e.target.value)}
              placeholder="{ }"
            />
          );
        case 'number':
          return (
            <Form.Control
              type="number"
              value={value ?? ''}
              disabled={disabled}
              onChange={(e) => handleChange(f.key, parseNumber(e.target.value))}
            />
          );
        case 'datetime':
          return (
            <Form.Control
              type="datetime-local"
              value={value ? String(value).slice(0, 16) : ''}
              disabled={disabled}
              onChange={(e) => handleChange(f.key, e.target.value === '' ? null : e.target.value)}
            />
          );
        case 'fk-school':
          return (
            <FkSearch
              endpoint="/api/schools/search"
              placeholder="Search Unit ID or School Name"
              disabled={disabled}
              valueLabel={
                formData.school_name
                  ? `${formData.unitid} — ${formData.school_name}`
                  : String(formData.unitid ?? '')
              }
              onSelect={(s) => handleChange('unitid', String(s.unitid))}
              render={(s) => (
                <span>
                  <strong>{s.unitid}</strong> — {s.name}
                </span>
              )}
            />
          );
        case 'fk-program':
          return (
            <FkSearch
              endpoint="/api/programs/search"
              placeholder="Search Program ID, title or school"
              disabled={disabled}
              valueLabel={
                formData.program_title
                  ? `${formData.program_id} — ${formData.program_title}`
                  : String(formData.program_id ?? '')
              }
              onSelect={(p) => handleChange('program_id', p.id)}
              render={(p) => (
                <span>
                  <strong>{p.id}</strong> — {p.title}{' '}
                  <span className="text-muted">({p.school_name})</span>
                </span>
              )}
            />
          );
        default:
          return (
            <Form.Control
              type="text"
              value={value ?? ''}
              disabled={disabled}
              onChange={(e) => handleChange(f.key, e.target.value === '' ? null : e.target.value)}
            />
          );
      }
    };

    return (
      <Modal show={show} onHide={onClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEdit ? 'Edit' : 'Add'} {config.title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Row>
              {config.fields.map((f) => (
                <Col md={f.full || f.type === 'textarea' || f.type === 'json' ? 12 : 6} key={f.key}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      {f.label}
                      {f.required && <span className="text-danger"> *</span>}
                    </Form.Label>
                    {renderField(f)}
                  </Form.Group>
                </Col>
              ))}
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return CrudFormModal;
}
