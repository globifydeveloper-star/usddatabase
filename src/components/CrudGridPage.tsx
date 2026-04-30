'use client';

import React from "react";
import { Grid } from "gridjs-react";
import { useCrudGrid, CrudConfig } from "@/hooks/useCrudGrid";

interface CrudGridPageProps<T> {
  config: CrudConfig<T>;
}

export function CrudGridPage<T extends { id: any }>({
  config,
}: CrudGridPageProps<T>) {
  const {
    modalOpen,
    selectedItem,
    key,
    handleEdit,
    handleDelete,
    handleSave,
    setModalOpen,
    setSelectedItem,
  } = useCrudGrid(config);

  const columns = [
    ...config.columns.map((col) => ({
      name: col.name,
      id: col.id as string,
    })),
    {
      name: "Actions",
      id: "action",
      formatter: (_: any, row: any) => {
        const item = row._cells?.[0]?.data || row;

        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(item)}
              className="btn btn-sm btn-primary"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item)}
              className="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div key={key}>
      <h2 className="mb-3">{config.labels.title}</h2>

      <div className="grid-toolbar mb-3">
        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedItem(null);
            setModalOpen(true);
          }}
        >
          Add New
        </button>
      </div>

      <Grid
        columns={columns}
        server={{
          url: config.apiEndpoint,
          then: (data: any) =>
            data.data.map((row: T) => [
              ...config.columns.map((col) => {
                const value = row[col.id];

                if (value === null || value === undefined) return "-";

                if (typeof value === "boolean")
                  return value ? "Yes" : "No";

                return value;
              }),
              row, // pass full row for actions
            ]),
          total: (data: any) => data.total,
        }}
        pagination={{
          limit: 10,
          server: {
            url: (prev, page, limit) => {
              const url = new URL(prev, window.location.origin);
              url.searchParams.set("page", String(page + 1));
              url.searchParams.set("limit", String(limit));
              return url.pathname + "?" + url.searchParams.toString();
            },
          },
        }}
        search={{
          server: {
            url: (prev, keyword) => {
              const url = new URL(prev, window.location.origin);
              url.searchParams.set("search", keyword);
              url.searchParams.set("page", "1");
              return url.pathname + "?" + url.searchParams.toString();
            },
          },
        }}
      />

      <config.modalComponent
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        data={selectedItem}
        onSuccess={handleSave}
      />
    </div>
  );
}