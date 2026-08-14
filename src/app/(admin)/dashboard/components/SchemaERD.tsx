'use client';

/**
 * SchemaERD.tsx
 * -----------------------------------------------------------------------
 * Main interactive ERD canvas component.
 * Modular, beginner-friendly container combining React Flow canvas,
 * layout algorithms, sidebar controls, custom table nodes, and inspector.
 * -----------------------------------------------------------------------
 */

import React, { useMemo, useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  MarkerType,
  ReactFlowProvider,
  type Node,
  type Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useLayoutContext } from '@/context/useLayoutContext';
import {
  tables,
  edges as schemaEdges,
  DOMAIN_META,
  HUB_TABLE_IDS,
  type Domain,
  TableNode,
  TableInspector,
  SidebarControls,
  type ViewMode,
  type DetailLevel,
  type LayoutDirection,
  buildHorizontalLayout,
  buildVerticalLayout,
} from './schema';

const nodeTypes = { tableNode: TableNode };

export default function SchemaERD() {
  const { themeMode } = useLayoutContext();
  const isDark = themeMode === 'dark';

  // State Management
  const [viewMode, setViewMode] = useState<ViewMode>('domain');
  const [selectedDomain, setSelectedDomain] = useState<Domain>('core_school');
  const [detailLevel, setDetailLevel] = useState<DetailLevel>('keys_only');
  const [layoutDir, setLayoutDir] = useState<LayoutDirection>('horizontal');
  const [search, setSearch] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

  // Toggle single table expansion
  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  // Filter visible tables based on View Mode and Search query
  const visibleTables = useMemo(() => {
    let list = tables;

    if (viewMode === 'overview') {
      list = tables.filter((t) => HUB_TABLE_IDS.includes(t.id));
    } else if (viewMode === 'domain') {
      list = tables.filter((t) => t.domain === selectedDomain);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (t) =>
          t.id.toLowerCase().includes(q) ||
          t.columns.some((c) => c.name.toLowerCase().includes(q))
      );
    }
    return list;
  }, [viewMode, selectedDomain, search]);

  // Compute Layout Nodes (Positioning & Opacity)
  const nodes: Node[] = useMemo(() => {
    const activeId = selectedTableId;
    const connectedIds = new Set<string>();

    if (activeId) {
      connectedIds.add(activeId);
      schemaEdges.forEach((e) => {
        if (e.source === activeId) connectedIds.add(e.target);
        if (e.target === activeId) connectedIds.add(e.source);
      });
    }

    const layoutNodes =
      viewMode === 'domain' || layoutDir === 'horizontal'
        ? buildHorizontalLayout(visibleTables, detailLevel, expandedIds)
        : buildVerticalLayout(visibleTables, detailLevel, expandedIds);

    return layoutNodes.map((n) => ({
      ...n,
      selected: n.id === selectedTableId,
      style: {
        opacity: activeId ? (connectedIds.has(n.id) ? 1 : 0.25) : 1,
        transition: 'opacity 0.15s ease',
      },
    }));
  }, [visibleTables, detailLevel, expandedIds, selectedTableId, viewMode, layoutDir]);

  const visibleIds = useMemo(() => new Set(nodes.map((n) => n.id)), [nodes]);

  // Compute Edges (Relationship Lines & Direction)
  const visibleEdges: Edge[] = useMemo(() => {
    const activeId = selectedTableId;

    return schemaEdges
      .filter((e) => visibleIds.has(e.source) && visibleIds.has(e.target))
      .map((e) => {
        const isConnected = activeId ? e.source === activeId || e.target === activeId : false;
        return {
          id: e.id,
          source: e.target, // Parent Hub on Left
          target: e.source, // Child Table on Right
          type: 'smoothstep',
          label: isConnected ? `${e.targetColumn} → ${e.sourceColumn}` : undefined,
          labelStyle: { fontSize: 10, fill: isDark ? '#cbd5e1' : '#334155', fontWeight: 600 },
          labelBgStyle: { fill: isDark ? '#1e293b' : '#ffffff', opacity: 0.95 },
          style: {
            stroke: isConnected ? '#3b82f6' : e.soft ? (isDark ? '#475569' : '#cbd5e1') : isDark ? '#64748b' : '#94a3b8',
            strokeWidth: isConnected ? 2.5 : e.soft ? 1 : 1.5,
            strokeDasharray: e.soft ? '4 3' : undefined,
            opacity: activeId ? (isConnected ? 1 : 0.15) : 1,
            transition: 'stroke 0.15s ease, opacity 0.15s ease',
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isConnected ? '#3b82f6' : isDark ? '#64748b' : '#94a3b8',
            width: 12,
            height: 12,
          },
          animated: isConnected,
        };
      });
  }, [visibleIds, selectedTableId, isDark]);

  // Handlers
  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedTableId((prev) => (prev === node.id ? null : node.id));
      toggleExpanded(node.id);
    },
    [toggleExpanded]
  );

  const selectedTableObj = useMemo(() => tables.find((t) => t.id === selectedTableId), [selectedTableId]);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: 'calc(88vh - 60px)',
        minHeight: 600,
        background: isDark ? '#0f172a' : '#f8fafc',
        color: isDark ? '#f8fafc' : '#0f172a',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Sidebar Controls Panel */}
      <SidebarControls
        isDark={isDark}
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedDomain={selectedDomain}
        setSelectedDomain={setSelectedDomain}
        layoutDir={layoutDir}
        setLayoutDir={setLayoutDir}
        detailLevel={detailLevel}
        setDetailLevel={setDetailLevel}
        search={search}
        setSearch={setSearch}
        onClearSelection={() => setSelectedTableId(null)}
      />

      {/* Main Interactive React Flow Canvas */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={visibleEdges}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            onPaneClick={() => setSelectedTableId(null)}
            fitView
            minZoom={0.2}
            maxZoom={1.5}
            proOptions={{ hideAttribution: true }}
          >
            <Background color={isDark ? '#334155' : '#cbd5e1'} gap={24} size={1} />
            <Controls style={{ background: isDark ? '#1e293b' : '#ffffff', color: isDark ? '#f8fafc' : '#0f172a', border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}` }} />
            <MiniMap
              nodeColor={(n) => {
                const domain = (n.data as { table?: { domain: Domain } })?.table?.domain;
                return domain ? DOMAIN_META[domain]?.color || '#64748b' : '#64748b';
              }}
              maskColor={isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(248, 250, 252, 0.75)'}
              style={{ background: isDark ? '#1e293b' : '#ffffff', borderRadius: 8 }}
            />
          </ReactFlow>
        </ReactFlowProvider>

        {/* Detail Popup Inspector for Selected Table */}
        {selectedTableObj && (
          <TableInspector
            table={selectedTableObj}
            isDark={isDark}
            onClose={() => setSelectedTableId(null)}
          />
        )}
      </div>
    </div>
  );
}
