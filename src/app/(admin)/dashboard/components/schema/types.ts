/**
 * types.ts
 * -----------------------------------------------------------------------
 * Core TypeScript interfaces for USDegrees Schema Map.
 * Defines column kinds, domain names, table schemas, and edge relationships.
 * -----------------------------------------------------------------------
 */

/** Type of column: 'pk' = Primary Key, 'fk' = Foreign Key, 'column' = Regular data field */
export type ColumnKind = 'pk' | 'fk' | 'column';

/** Schema column definition */
export interface SchemaColumn {
  name: string;
  kind: ColumnKind;
  refTable?: string;  // Target table name if this column links to another table
  refColumn?: string; // Target column name (e.g. 'unitid' or 'id')
  soft?: boolean;      // True = convention-based join, false = enforced database constraint
}

/** 8 Functional Database Domains */
export type Domain =
  | 'core_school'
  | 'programs_outcomes'
  | 'pseo'
  | 'end_users'
  | 'cms_admin'
  | 'legacy_auth'
  | 'reference'
  | 'staging_cache';

/** Ordered list of domains */
export const DOMAIN_ORDER: Domain[] = [
  'core_school',
  'programs_outcomes',
  'pseo',
  'end_users',
  'cms_admin',
  'legacy_auth',
  'reference',
  'staging_cache',
];

/** Metadata & visual colors for each domain */
export const DOMAIN_META: Record<Domain, { label: string; color: string }> = {
  core_school: { label: 'Core School Data', color: '#3b82f6' },      // Blue
  programs_outcomes: { label: 'Programs & Outcomes', color: '#8b5cf6' }, // Violet
  pseo: { label: 'PSEO (Employment)', color: '#06b6d4' },           // Cyan
  end_users: { label: 'USDegrees End Users', color: '#22c55e' },    // Green
  cms_admin: { label: 'CMS Admin', color: '#f59e0b' },              // Amber
  legacy_auth: { label: 'Legacy Auth System', color: '#ef4444' },   // Red
  reference: { label: 'Reference & Lookups', color: '#64748b' },    // Slate
  staging_cache: { label: 'Staging & Cache ETL', color: '#eab308' },// Yellow
};

/** Main Database Table Definition */
export interface SchemaTable {
  id: string;            // Table name (e.g. 'schools', 'programs')
  domain: Domain;        // Domain category
  isView?: boolean;      // True if this is a SQL view
  standalone?: boolean;  // True if isolated table without drawn FK constraints
  columns: SchemaColumn[];
  note?: string;         // Helpful explanation note
}

/** Relationship line (Edge) connecting two tables */
export interface SchemaEdge {
  id: string;
  source: string;        // Child table ID
  target: string;        // Parent table ID
  sourceColumn: string;  // Child column (e.g. 'unitid')
  targetColumn: string;  // Parent column (e.g. 'unitid')
  soft?: boolean;        // Dotted line for convention joins
}

/** Master Hub Tables that form the backbone of USDegrees database */
export const HUB_TABLE_IDS = ['schools', 'programs', 'pseo_entities', 'usdusers', 'cms_users'];
