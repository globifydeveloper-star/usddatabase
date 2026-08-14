import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { toast } from "@/utils/toast";
import type { CmsRole } from "./useCurrentUser";
import { confirmDbStructureWarning } from "@/utils/dbWarningModal";
import { deriveTableName } from "@/lib/table-name";

export type ColumnConfig<T> = {
  id: keyof T;
  name: string;
  sort?: boolean;
  width?: string;
};

export interface CrudConfig<T> {
  apiEndpoint: string;
  columns: ColumnConfig<T>[];
  modalComponent: React.ComponentType<{
    show: boolean;
    onClose: () => void;
    data: T | null;
    onSuccess: () => void;
  }>;
  labels: {
    title: string;
    deleteConfirm: string;
  };
  showAddButton?: boolean;  // ← new, defaults to true
  showActions?: boolean;    // ← new, defaults to true
  showEditAction?: boolean; // defaults to true; set false to hide only the row Edit icon
  showDeleteAction?: boolean; // defaults to true; set false to hide only the row Delete icon
  // Builds the path segment used for PUT/DELETE on a single row.
  // Defaults to `item.unitid ?? item.id`. Override for tables whose primary
  // key is neither `id` nor `unitid` (e.g. cip_prefix) or is composite.
  buildItemPath?: (item: T) => string;
  // Optional identifier accessor for pages that provide a custom id field.
  getId?: (item: T) => string | number;
  // When set, adds a Download action to each row that opens the given URL.
  downloadAction?: {
    getUrl: (item: T) => string;
  };
  // Overrides the derived DB table name used for the client-side
  // editor-permission check in CrudGridPage (see deriveTableName()).
  tableName?: string;
  // Overrides the standard canWrite-gated Add button visibility: when set,
  // the Add button shows for exactly these roles regardless of the table's
  // per-editor permission grants. For pages like CMS Users where write
  // access isn't governed by cms_editor_table_permissions.
  allowAddForRoles?: CmsRole[];
}

export function defaultItemPath(item: any): string {
  return String(item?.unitid ?? item?.id ?? "");
}

export function useCrudGrid<T extends { unitid: any; id: any }>(config: CrudConfig<T>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [key, setKey] = useState(0);

  const handleEdit = useCallback(async (item: T) => {
    const tableName = config.tableName ?? deriveTableName(config.apiEndpoint);
    const confirmed = await confirmDbStructureWarning(tableName);
    if (!confirmed) return;
    setSelectedItem(item);
    setModalOpen(true);
  }, [config]);

  const handleDelete = useCallback(async (item: T) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: config.labels.deleteConfirm,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const path = config.buildItemPath
        ? config.buildItemPath(item)
        : defaultItemPath(item);
      const res = await fetch(`${config.apiEndpoint}/${path}`, {
        method: "DELETE",
      });
      const body = await res.json().catch(() => null);

      if (!res.ok || (body && body.success === false)) {
        await Swal.fire({
          title: "Cannot Delete",
          text: body?.message || "Something went wrong",
          icon: "warning",
          confirmButtonColor: "#f59e0b",
          confirmButtonText: "Ok, got it!",
        });
        return;
      }

      toast.success(body?.message || "Deleted successfully");
      setKey((prev) => prev + 1);
    } catch {
      await Swal.fire({
        title: "Cannot Delete",
        text: "Something went wrong",
        icon: "warning",
        confirmButtonColor: "#f59e0b",
        confirmButtonText: "Ok, got it!",
      });
    }
  }, [config]);

  const handleSave = useCallback(() => {
    setModalOpen(false);
    setSelectedItem(null);
    setKey((prev) => prev + 1);
    toast.success("Saved successfully");
  }, []);

  return {
    modalOpen,
    selectedItem,
    key,
    handleEdit,
    handleDelete,
    handleSave,
    setModalOpen,
    setSelectedItem,
  };
}