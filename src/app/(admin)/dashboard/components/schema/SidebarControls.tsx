/**
 * SidebarControls.tsx
 * -----------------------------------------------------------------------
 * Sidebar component containing View Mode selectors, Domain filters,
 * Layout orientation controls, detail toggles, and live search.
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { Domain, DOMAIN_META, DOMAIN_ORDER } from './types';
import { tables, edges as schemaEdges } from './domainData';
import { DetailLevel } from './layoutUtils';

export type ViewMode = 'overview' | 'domain' | 'full';
export type LayoutDirection = 'horizontal' | 'vertical';

interface SidebarControlsProps {
  isDark: boolean;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  selectedDomain: Domain;
  setSelectedDomain: (domain: Domain) => void;
  layoutDir: LayoutDirection;
  setLayoutDir: (dir: LayoutDirection) => void;
  detailLevel: DetailLevel;
  setDetailLevel: (level: DetailLevel) => void;
  search: string;
  setSearch: (query: string) => void;
  onClearSelection: () => void;
}

export function SidebarControls({
  isDark,
  viewMode,
  setViewMode,
  selectedDomain,
  setSelectedDomain,
  layoutDir,
  setLayoutDir,
  detailLevel,
  setDetailLevel,
  search,
  setSearch,
  onClearSelection,
}: SidebarControlsProps) {
  return (
    <div
      className="schema-sidebar-controls"
      style={{
        flexShrink: 0,
        borderRight: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
        background: isDark ? '#1e293b' : '#ffffff',
        padding: 16,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Title */}
      <div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>USDegrees Schema Map</div>
        <p style={{ fontSize: 12, color: isDark ? '#94a3b8' : '#64748b', margin: '4px 0 0 0' }}>
          {tables.length} tables · {schemaEdges.length} connections
        </p>
      </div>

      {/* View Mode */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: isDark ? '#94a3b8' : '#64748b', marginBottom: 6, textTransform: 'uppercase' }}>
          View Mode
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button
            onClick={() => { setViewMode('overview'); onClearSelection(); }}
            style={{
              padding: '8px 10px',
              borderRadius: 6,
              border: `1px solid ${viewMode === 'overview' ? '#3b82f6' : isDark ? '#334155' : '#e2e8f0'}`,
              background: viewMode === 'overview' ? (isDark ? '#1e3a8a' : '#eff6ff') : 'transparent',
              color: viewMode === 'overview' ? '#3b82f6' : isDark ? '#cbd5e1' : '#334155',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            👑 Overview (5 Core Hubs)
          </button>

          <button
            onClick={() => { setViewMode('domain'); onClearSelection(); }}
            style={{
              padding: '8px 10px',
              borderRadius: 6,
              border: `1px solid ${viewMode === 'domain' ? '#3b82f6' : isDark ? '#334155' : '#e2e8f0'}`,
              background: viewMode === 'domain' ? (isDark ? '#1e3a8a' : '#eff6ff') : 'transparent',
              color: viewMode === 'domain' ? '#3b82f6' : isDark ? '#cbd5e1' : '#334155',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            📁 By Functional Domain
          </button>

          <button
            onClick={() => { setViewMode('full'); onClearSelection(); }}
            style={{
              padding: '8px 10px',
              borderRadius: 6,
              border: `1px solid ${viewMode === 'full' ? '#3b82f6' : isDark ? '#334155' : '#e2e8f0'}`,
              background: viewMode === 'full' ? (isDark ? '#1e3a8a' : '#eff6ff') : 'transparent',
              color: viewMode === 'full' ? '#3b82f6' : isDark ? '#cbd5e1' : '#334155',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            🗺️ Full Schema (65 Tables)
          </button>
        </div>
      </div>

      {/* Domain Selection */}
      {viewMode === 'domain' && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: isDark ? '#94a3b8' : '#64748b', marginBottom: 6, textTransform: 'uppercase' }}>
            Select Domain
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {DOMAIN_ORDER.map((d) => {
              const meta = DOMAIN_META[d];
              const count = tables.filter((t) => t.domain === d).length;
              const isSelected = selectedDomain === d;
              return (
                <button
                  key={d}
                  onClick={() => { setSelectedDomain(d); onClearSelection(); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    padding: '6px 8px',
                    borderRadius: 6,
                    border: `1px solid ${isSelected ? meta.color : 'transparent'}`,
                    background: isSelected ? (isDark ? '#334155' : '#f1f5f9') : 'transparent',
                    color: isDark ? '#e2e8f0' : '#334155',
                    fontSize: 12,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: meta.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontWeight: isSelected ? 600 : 400 }}>{meta.label}</span>
                  <span style={{ fontSize: 10, color: isDark ? '#94a3b8' : '#64748b' }}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Layout View Toggle */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: isDark ? '#94a3b8' : '#64748b', marginBottom: 6, textTransform: 'uppercase' }}>
          Layout View
        </div>
        <div style={{ display: 'flex', gap: 4, background: isDark ? '#0f172a' : '#f1f5f9', padding: 3, borderRadius: 6 }}>
          <button
            onClick={() => setLayoutDir('horizontal')}
            style={{
              flex: 1,
              padding: '5px 8px',
              fontSize: 11,
              fontWeight: 600,
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              background: layoutDir === 'horizontal' ? (isDark ? '#334155' : '#ffffff') : 'transparent',
              color: layoutDir === 'horizontal' ? '#3b82f6' : isDark ? '#94a3b8' : '#64748b',
            }}
          >
            ↔️ Horizontal
          </button>
          <button
            onClick={() => setLayoutDir('vertical')}
            style={{
              flex: 1,
              padding: '5px 8px',
              fontSize: 11,
              fontWeight: 600,
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              background: layoutDir === 'vertical' ? (isDark ? '#334155' : '#ffffff') : 'transparent',
              color: layoutDir === 'vertical' ? '#3b82f6' : isDark ? '#94a3b8' : '#64748b',
            }}
          >
            ↕️ Vertical
          </button>
        </div>
      </div>

      {/* Detail Level */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: isDark ? '#94a3b8' : '#64748b', marginBottom: 6, textTransform: 'uppercase' }}>
          Columns Detail
        </div>
        <div style={{ display: 'flex', gap: 4, background: isDark ? '#0f172a' : '#f1f5f9', padding: 3, borderRadius: 6 }}>
          <button
            onClick={() => setDetailLevel('keys_only')}
            style={{
              flex: 1,
              padding: '5px 8px',
              fontSize: 11,
              fontWeight: 600,
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              background: detailLevel === 'keys_only' ? (isDark ? '#334155' : '#ffffff') : 'transparent',
              color: detailLevel === 'keys_only' ? '#3b82f6' : isDark ? '#94a3b8' : '#64748b',
            }}
          >
            Keys Only (PK/FK)
          </button>
          <button
            onClick={() => setDetailLevel('all')}
            style={{
              flex: 1,
              padding: '5px 8px',
              fontSize: 11,
              fontWeight: 600,
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              background: detailLevel === 'all' ? (isDark ? '#334155' : '#ffffff') : 'transparent',
              color: detailLevel === 'all' ? '#3b82f6' : isDark ? '#94a3b8' : '#64748b',
            }}
          >
            All Columns
          </button>
        </div>
      </div>

      {/* Search */}
      <div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search table or column…"
          style={{
            width: '100%',
            padding: '7px 10px',
            fontSize: 12,
            borderRadius: 6,
            border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
            background: isDark ? '#0f172a' : '#ffffff',
            color: isDark ? '#f8fafc' : '#0f172a',
            outline: 'none',
          }}
        />
      </div>

      {/* Legend */}
      <div
        style={{
          fontSize: 11,
          color: isDark ? '#94a3b8' : '#64748b',
          background: isDark ? '#0f172a' : '#f8fafc',
          padding: 10,
          borderRadius: 6,
          border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
          lineHeight: 1.6,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 4, color: isDark ? '#e2e8f0' : '#334155' }}>Beginner Guide:</div>
        <div>👑 <b>Hub Table</b>: Master entity</div>
        <div><b style={{ color: '#d97706' }}>PK</b>: Primary Key (unique ID)</div>
        <div><b style={{ color: '#0284c7' }}>FK</b>: Foreign Key (reference)</div>
        <div>〰️ <b>Soft Join</b>: Shared column convention</div>
      </div>
    </div>
  );
}
