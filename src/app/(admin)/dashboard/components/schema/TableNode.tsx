/**
 * TableNode.tsx
 * -----------------------------------------------------------------------
 * Custom React Flow node component representing a Database Table card.
 * Displays domain-colored header, table status tags, and PK/FK columns.
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { SchemaTable, DOMAIN_META, HUB_TABLE_IDS } from './types';
import { DetailLevel } from './layoutUtils';
import { useLayoutContext } from '@/context/useLayoutContext';

const NODE_WIDTH = 280;

interface TableNodeProps {
  table: SchemaTable;
  detailLevel: DetailLevel;
  expanded: boolean;
}

export function TableNode({ data, selected }: NodeProps<TableNodeProps>) {
  const { table, detailLevel, expanded } = data;
  const meta = DOMAIN_META[table.domain];
  const { themeMode } = useLayoutContext();
  const isDark = themeMode === 'dark';
  const isHub = HUB_TABLE_IDS.includes(table.id);

  // Column filtering (Keys only vs All columns)
  const keyCols = table.columns.filter((c) => c.kind === 'pk' || c.kind === 'fk');
  const displayCols =
    detailLevel === 'keys_only' && !expanded
      ? keyCols.length > 0
        ? keyCols
        : table.columns.slice(0, 2)
      : table.columns;

  const hasHiddenCols =
    detailLevel === 'keys_only' && !expanded && table.columns.length > displayCols.length;

  return (
    <div
      style={{
        width: NODE_WIDTH,
        borderRadius: 10,
        overflow: 'hidden',
        border: selected
          ? `2px solid #3b82f6`
          : `1.5px solid ${isDark ? (isHub ? meta.color : '#334155') : isHub ? meta.color : '#cbd5e1'}`,
        background: isDark ? '#1e293b' : '#ffffff',
        boxShadow: selected
          ? `0 0 16px ${meta.color}66`
          : isDark
          ? '0 4px 14px rgba(0,0,0,0.4)'
          : '0 2px 10px rgba(0,0,0,0.06)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      {/* Handles for left-to-right connection lines */}
      <Handle type="target" position={Position.Left} style={{ opacity: 0, width: 8, height: 8 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0, width: 8, height: 8 }} />

      {/* Card Header */}
      <div
        style={{
          background: isHub ? meta.color : isDark ? '#0f172a' : '#f1f5f9',
          color: isHub ? '#ffffff' : isDark ? '#f8fafc' : '#0f172a',
          fontWeight: 700,
          fontSize: 13,
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: isHub ? 'none' : `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {isHub && <span title="Master Hub Table">👑</span>}
          <span>{table.id}</span>
        </span>

        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {table.isView && (
            <span style={{ fontSize: 9, background: isDark ? '#3b82f644' : '#dbeafe', color: '#1d4ed8', padding: '1px 5px', borderRadius: 4, fontWeight: 600 }}>
              VIEW
            </span>
          )}
          {table.standalone && !table.isView && (
            <span style={{ fontSize: 9, background: isDark ? '#47556944' : '#f1f5f9', color: isDark ? '#94a3b8' : '#64748b', padding: '1px 5px', borderRadius: 4 }}>
              STANDALONE
            </span>
          )}
        </div>
      </div>

      {/* Columns List */}
      <div>
        {displayCols.map((c) => (
          <div
            key={c.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11.5,
              padding: '4px 12px',
              color: isDark ? '#cbd5e1' : '#334155',
              borderTop: `1px solid ${isDark ? '#33415522' : '#f1f5f9'}`,
            }}
          >
            <span
              style={{
                width: 22,
                flexShrink: 0,
                fontSize: 9.5,
                fontWeight: 700,
                color: c.kind === 'pk' ? '#d97706' : c.kind === 'fk' ? '#0284c7' : 'transparent',
              }}
            >
              {c.kind === 'pk' ? 'PK' : c.kind === 'fk' ? 'FK' : ''}
            </span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
              {c.name}
            </span>
            {c.soft && (
              <span style={{ fontSize: 10, color: isDark ? '#64748b' : '#94a3b8' }} title="Soft convention join">
                〰️
              </span>
            )}
          </div>
        ))}

        {hasHiddenCols && (
          <div
            style={{
              fontSize: 10.5,
              padding: '4px 12px',
              color: isDark ? '#94a3b8' : '#64748b',
              background: isDark ? '#0f172a44' : '#f8fafc',
              borderTop: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
              fontStyle: 'italic',
            }}
          >
            +{table.columns.length - displayCols.length} more columns (click to expand)
          </div>
        )}
      </div>
    </div>
  );
}
