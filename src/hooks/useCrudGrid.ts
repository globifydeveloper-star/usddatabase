import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "@/utils/toast";

export type ColumnConfig<T> = {
  id: keyof T;
  name: string;
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
}

export function useCrudGrid<T extends { id: any }>(config: CrudConfig<T>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [key, setKey] = useState(0);

  const handleEdit = (item: T) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (item: T) => {
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
      const res = await fetch(`${config.apiEndpoint}/${item.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      toast.success("Deleted successfully");
      setKey((prev) => prev + 1);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleSave = () => {
    setModalOpen(false);
    setSelectedItem(null);
    setKey((prev) => prev + 1);
    toast.success("Saved successfully");
  };

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