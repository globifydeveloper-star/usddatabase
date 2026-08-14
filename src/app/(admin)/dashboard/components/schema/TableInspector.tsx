/**
 * TableInspector.tsx
 * -----------------------------------------------------------------------
 * Bottom-right popup drawer showing full column details, primary/foreign
 * key references, and notes for the currently selected table.
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { SchemaTable, DOMAIN_META } from './types';

interface TableInspectorProps {
  table: SchemaTable;
  isDark: boolean;
  onClose: () => void;
}

export function TableInspector({ table, isDark, onClose }: TableInspectorProps) {
  const domainMeta = DOMAIN_META[table.domain];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        width: 320,
        maxHeight: 260,
        overflowY: 'auto',
        background: isDark ? '#1e293b' : '#ffffff',
        color: isDark ? '#f8fafc' : '#0f172a',
        border: `1.5px solid ${domainMeta.color}`,
        borderRadius: 8,
        padding: 14,
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        fontSize: 12,
        zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 14 }}>{table.id}</span>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: isDark ? '#94a3b8' : '#64748b', cursor: 'pointer', fontSize: 14 }}
        >
          ✕
        </button>
      </div>

      <div style={{ marginBottom: 6 }}>
        <span
          style={{
            fontSize: 11,
            background: domainMeta.color,
            color: '#ffffff',
            padding: '2px 6px',
            borderRadius: 4,
            fontWeight: 600,
          }}
        >
          {domainMeta.label}
        </span>
      </div>

      {table.note && (
        <p style={{ margin: '6px 0', fontSize: 11.5, color: isDark ? '#cbd5e1' : '#475569', lineHeight: 1.4 }}>
          {table.note}
        </p>
      )}

      <div style={{ marginTop: 8 }}>
        <div style={{ fontWeight: 600, fontSize: 11, color: isDark ? '#94a3b8' : '#64748b', marginBottom: 4 }}>
          COLUMNS ({table.columns.length}):
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {table.columns.map((c) => (
            <span
              key={c.name}
              style={{
                fontSize: 10.5,
                padding: '2px 6px',
                borderRadius: 4,
                background: c.kind === 'pk' ? '#fef3c7' : c.kind === 'fk' ? '#e0f2fe' : isDark ? '#334155' : '#f1f5f9',
                color: c.kind === 'pk' ? '#92400e' : c.kind === 'fk' ? '#075985' : isDark ? '#cbd5e1' : '#334155',
                fontWeight: c.kind !== 'column' ? 600 : 400,
              }}
            >
              {c.kind === 'pk' ? 'PK ' : c.kind === 'fk' ? 'FK ' : ''}{c.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
