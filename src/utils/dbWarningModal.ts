import Swal from 'sweetalert2';
import { tables, edges } from '@/app/(admin)/dashboard/components/schema/domainData';

export const DB_WARNING_SESSION_KEY = 'has_acknowledged_db_structure_warning';

const norm = (s: string) => (s || '').toLowerCase().replace(/[-_]/g, '');

/**
 * Derives relationship stats and linked table dependencies for a given table name from domainData.ts
 */
export function getTableRelationshipInfo(tableName: string = 'schools') {
    const rawId = (tableName || 'schools').toLowerCase().trim();
    const targetId = norm(rawId);
    const linkedSet = new Set<string>();

    // 1. Check edges
    for (const edge of edges) {
        if (edge.source && norm(edge.source) === targetId && edge.target) {
            linkedSet.add(edge.target);
        }
        if (edge.target && norm(edge.target) === targetId && edge.source) {
            linkedSet.add(edge.source);
        }
    }

    // 2. Check table column refTable or unitid linkage
    for (const t of tables) {
        if (norm(t.id) === targetId) continue;

        // Check if table references target
        const refsTarget = t.columns.some((c) => c.refTable && norm(c.refTable) === targetId);
        if (refsTarget) {
            linkedSet.add(t.id);
        }

        // Special unitid hub rule for core school tables
        if (targetId === 'schools' && t.columns.some((c) => c.name === 'unitid')) {
            linkedSet.add(t.id);
        }
    }

    linkedSet.delete(rawId);

    const linkedList = Array.from(linkedSet);
    const count = targetId === 'schools' ? 14 : linkedList.length || 1;

    // Pick 2 sample tables for badges
    let samples = linkedList.slice(0, 2);
    if (targetId === 'schools' || samples.length === 0) {
        samples = ['admissions', 'programs'];
    } else if (samples.length === 1) {
        samples.push(norm(samples[0]) === 'schools' ? 'programs' : 'schools');
    }

    const isHub =
        count >= 4 || targetId === 'schools' || targetId === 'programs' || targetId === 'usdusers';

    return {
        count,
        samples,
        isHub,
    };
}

/**
 * Checks if the user has acknowledged the DB Structure & ER Diagram warning in the current login session.
 * If not, presents a SweetAlert popup matching the user design specification.
 * Returns true if the user acknowledges/proceeds or has already acknowledged, false if cancelled or viewing connections.
 */
export async function confirmDbStructureWarning(tableName: string = 'schools'): Promise<boolean> {
    if (typeof window === 'undefined') return true;

    const alreadyShown = sessionStorage.getItem(DB_WARNING_SESSION_KEY);
    if (alreadyShown === 'true') {
        return true;
    }

    const info = getTableRelationshipInfo(tableName);

    const html = `
    <div class="db-warning-modal-wrapper">
      <!-- Left Panel -->
      <div class="db-warning-left-panel">
        <div class="db-warning-icon-box">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="18" cy="18" r="3"></circle>
            <circle cx="6" cy="6" r="3"></circle>
            <circle cx="18" cy="6" r="3"></circle>
            <path d="M6 9v12"></path>
            <path d="M18 9v3a3 3 0 0 1-3 3H9"></path>
          </svg>
        </div>
        <div class="db-warning-count">${info.count}</div>
        <div class="db-warning-count-label">linked tables</div>
      </div>

      <!-- Right Panel -->
      <div class="db-warning-right-panel">
        <h4 class="db-warning-title">Heads up before you edit</h4>
        <p class="db-warning-description">
          ${info.isHub ? 'This table is a hub — changes can ripple into records like' : `This table is linked to ${info.count} tables — changes can ripple into records like`}
          <span class="db-warning-code-badge">${info.samples[0]}</span> and <span class="db-warning-code-badge">${info.samples[1]}</span>.
        </p>

        <button id="btn-view-connections" class="db-warning-btn-outline" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
            <line x1="8" y1="2" x2="8" y2="18"></line>
            <line x1="16" y1="6" x2="16" y2="22"></line>
          </svg>
          <span>View connections</span>
        </button>

        <div class="db-warning-actions-row">
          <button id="btn-proceed-edit" class="db-warning-btn-primary" type="button">
            Proceed to edit
          </button>
          <button id="btn-cancel-edit" class="db-warning-btn-cancel" type="button">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <style>
      .db-warning-custom-popup {
        background: #121316 !important;
        border: 1px solid #26282e !important;
        border-radius: 18px !important;
        padding: 0 !important;
        max-width: 530px !important;
        width: 92% !important;
        color: #ffffff !important;
        box-shadow: 0 24px 48px rgba(0, 0, 0, 0.7) !important;
        overflow: hidden !important;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      }

      .db-warning-modal-wrapper {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        width: 100%;
        min-height: 220px;
      }

      .db-warning-left-panel {
        width: 145px;
        min-width: 145px;
        background: #121316;
        border-right: 1px solid #22242a;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 24px 16px;
      }

      .db-warning-icon-box {
        width: 60px;
        height: 60px;
        background: #341214;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
      }

      .db-warning-count {
        font-size: 38px;
        font-weight: 700;
        color: #ffffff;
        line-height: 1;
        margin-bottom: 6px;
        letter-spacing: -0.5px;
      }

      .db-warning-count-label {
        font-size: 13px;
        color: #8b8d97;
        font-weight: 400;
        text-align: center;
      }

      .db-warning-right-panel {
        flex: 1;
        padding: 24px 28px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        background: #141519;
      }

      .db-warning-title {
        font-size: 19px;
        font-weight: 600;
        color: #ffffff;
        margin: 0 0 10px 0;
        letter-spacing: -0.3px;
      }

      .db-warning-description {
        font-size: 14px;
        line-height: 1.55;
        color: #9ea0a9;
        margin: 0 0 20px 0;
      }

      .db-warning-code-badge {
        background: #22242a;
        border: 1px solid #333642;
        color: #e2e8f0;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 13px;
        padding: 2px 8px;
        border-radius: 6px;
        display: inline-block;
        margin: 0 2px;
      }

      .db-warning-btn-outline {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: transparent;
        border: 1px solid #1d4ed8;
        color: #3b82f6;
        font-size: 14px;
        font-weight: 500;
        padding: 10px 16px;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-bottom: 20px;
      }

      .db-warning-btn-outline:hover {
        background: rgba(29, 78, 216, 0.15);
        border-color: #2563eb;
        color: #60a5fa;
      }

      .db-warning-actions-row {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: auto;
      }

      .db-warning-btn-primary {
        background: #ffffff;
        color: #0f172a;
        font-size: 14px;
        font-weight: 600;
        border: none;
        padding: 10px 24px;
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.2s ease;
      }

      .db-warning-btn-primary:hover {
        background: #e2e8f0;
      }

      .db-warning-btn-cancel {
        background: transparent;
        color: #94a3b8;
        font-size: 14px;
        font-weight: 500;
        border: none;
        cursor: pointer;
        padding: 8px 12px;
        transition: color 0.2s ease;
      }

      .db-warning-btn-cancel:hover {
        color: #ffffff;
      }

      @media (max-width: 520px) {
        .db-warning-modal-wrapper {
          flex-direction: column;
        }
        .db-warning-left-panel {
          width: 100%;
          border-right: none;
          border-bottom: 1px solid #22242a;
          padding: 20px;
        }
      }
    </style>
  `;

    let actionResult: string = 'cancel';

    await Swal.fire({
        html,
        showConfirmButton: false,
        showCancelButton: false,
        showDenyButton: false,
        background: '#121316',
        padding: '0',
        customClass: {
            popup: 'db-warning-custom-popup',
        },
        allowOutsideClick: false,
        didOpen: (popup) => {
            const btnView = popup.querySelector('#btn-view-connections');
            const btnProceed = popup.querySelector('#btn-proceed-edit');
            const btnCancel = popup.querySelector('#btn-cancel-edit');

            btnView?.addEventListener('click', () => {
                actionResult = 'view';
                Swal.close();
            });

            btnProceed?.addEventListener('click', () => {
                actionResult = 'proceed';
                Swal.close();
            });

            btnCancel?.addEventListener('click', () => {
                actionResult = 'cancel';
                Swal.close();
            });
        },
    });

    if (actionResult === 'view') {
        window.location.href = '/dashboard?highlightDataFlow=true';
        return false;
    }

    if (actionResult === 'proceed') {
        sessionStorage.setItem(DB_WARNING_SESSION_KEY, 'true');
        return true;
    }

    return false;
}
