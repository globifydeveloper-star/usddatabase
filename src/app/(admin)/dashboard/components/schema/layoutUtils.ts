/**
 * layoutUtils.ts
 * -----------------------------------------------------------------------
 * Simple, beginner-friendly layout functions to calculate (X, Y) positions
 * for React Flow table nodes.
 * -----------------------------------------------------------------------
 */

import type { Node } from 'reactflow';
import { SchemaTable, DOMAIN_ORDER, HUB_TABLE_IDS } from './types';
import { edges as schemaEdges } from './domainData';

const COLUMN_WIDTH = 380;
const NODE_WIDTH = 280;
const ROW_GAP = 28;
const HEADER_HEIGHT = 40;
const ROW_HEIGHT = 22;

export type DetailLevel = 'keys_only' | 'all';

/** Calculate height of a table node card based on visible columns */
export function estimateNodeHeight(t: SchemaTable, detailLevel: DetailLevel, isExpanded: boolean): number {
  const visibleCols =
    detailLevel === 'keys_only' && !isExpanded
      ? t.columns.filter((c) => c.kind === 'pk' || c.kind === 'fk')
      : t.columns;
  return HEADER_HEIGHT + Math.max(1, visibleCols.length) * ROW_HEIGHT + 14;
}

/**
 * Build Horizontal Flow Layout (Parent on Left -> Children on Right)
 * Provides optimal connection line visibility with zero looping curves.
 */
export function buildHorizontalLayout(
  filteredTables: SchemaTable[],
  detailLevel: DetailLevel,
  expandedIds: Set<string>
): Node[] {
  const nodes: Node[] = [];
  if (filteredTables.length === 0) return nodes;

  // Identify main Hub table
  const domainHubs = filteredTables.filter((t) => HUB_TABLE_IDS.includes(t.id));
  const mainHubId = domainHubs.length > 0 ? domainHubs[0].id : filteredTables[0].id;

  // Level 0: Master Hub (Left Column - X = 60)
  const level0 = filteredTables.filter((t) => t.id === mainHubId);

  // Level 1: Direct child tables linked to Hub (Middle Column - X = 440)
  const level1 = filteredTables.filter(
    (t) =>
      t.id !== mainHubId &&
      schemaEdges.some(
        (e) => (e.source === t.id && e.target === mainHubId) || (e.target === t.id && e.source === mainHubId)
      )
  );

  // Level 2: Remaining tables (Right Column - X = 820)
  const placedIds = new Set([...level0.map((t) => t.id), ...level1.map((t) => t.id)]);
  const level2 = filteredTables.filter((t) => !placedIds.has(t.id));

  // Position Level 0
  let y0 = 120;
  for (const t of level0) {
    nodes.push({
      id: t.id,
      type: 'tableNode',
      position: { x: 60, y: y0 },
      data: { table: t, detailLevel, expanded: expandedIds.has(t.id) },
      draggable: true,
    });
    y0 += estimateNodeHeight(t, detailLevel, expandedIds.has(t.id)) + ROW_GAP;
  }

  // Position Level 1 (split into 2 sub-columns if more than 5 tables)
  const MAX_PER_COL = Math.max(5, Math.ceil(level1.length / 2));
  const level1Col1 = level1.slice(0, MAX_PER_COL);
  const level1Col2 = level1.slice(MAX_PER_COL);

  let y1 = 40;
  for (const t of level1Col1) {
    nodes.push({
      id: t.id,
      type: 'tableNode',
      position: { x: 440, y: y1 },
      data: { table: t, detailLevel, expanded: expandedIds.has(t.id) },
      draggable: true,
    });
    y1 += estimateNodeHeight(t, detailLevel, expandedIds.has(t.id)) + ROW_GAP;
  }

  let y1b = 40;
  for (const t of level1Col2) {
    nodes.push({
      id: t.id,
      type: 'tableNode',
      position: { x: 820, y: y1b },
      data: { table: t, detailLevel, expanded: expandedIds.has(t.id) },
      draggable: true,
    });
    y1b += estimateNodeHeight(t, detailLevel, expandedIds.has(t.id)) + ROW_GAP;
  }

  // Position Level 2
  const level2X = level1Col2.length > 0 ? 1200 : 820;
  let y2 = 40;
  for (const t of level2) {
    nodes.push({
      id: t.id,
      type: 'tableNode',
      position: { x: level2X, y: y2 },
      data: { table: t, detailLevel, expanded: expandedIds.has(t.id) },
      draggable: true,
    });
    y2 += estimateNodeHeight(t, detailLevel, expandedIds.has(t.id)) + ROW_GAP;
  }

  return nodes;
}

/**
 * Build Standard Vertical Grid Layout
 * Groups tables into domain columns side-by-side.
 */
export function buildVerticalLayout(
  filteredTables: SchemaTable[],
  detailLevel: DetailLevel,
  expandedIds: Set<string>
): Node[] {
  const nodes: Node[] = [];
  const domainsPresent = DOMAIN_ORDER.filter((d) => filteredTables.some((t) => t.domain === d));

  let x = 60;
  for (const domain of domainsPresent) {
    const domainTables = filteredTables
      .filter((t) => t.domain === domain)
      .sort((a, b) => {
        const aIsHub = HUB_TABLE_IDS.includes(a.id);
        const bIsHub = HUB_TABLE_IDS.includes(b.id);
        if (aIsHub && !bIsHub) return -1;
        if (!aIsHub && bIsHub) return 1;
        return a.id.localeCompare(b.id);
      });

    let y = 60;
    for (const t of domainTables) {
      nodes.push({
        id: t.id,
        type: 'tableNode',
        position: { x, y },
        data: { table: t, detailLevel, expanded: expandedIds.has(t.id) },
        draggable: true,
      });
      y += estimateNodeHeight(t, detailLevel, expandedIds.has(t.id)) + ROW_GAP;
    }
    x += COLUMN_WIDTH;
  }
  return nodes;
}
