import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { toast } from "@/utils/toast";

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
  // When set, adds a Download action to each row that opens the given URL.
  downloadAction?: {
    getUrl: (item: T) => string;
  };
}

export function defaultItemPath(item: any): string {
  return String(item?.unitid ?? item?.id ?? "");
}

export function useCrudGrid<T extends { unitid: any; id: any }>(config: CrudConfig<T>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [key, setKey] = useState(0);

  const handleEdit = useCallback((item: T) => {
    setSelectedItem(item);
    setModalOpen(true);
  }, []);

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

      if (!res.ok) throw new Error();

      toast.success("Deleted successfully");
      setKey((prev) => prev + 1);
    } catch {
      toast.error("Something went wrong");
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