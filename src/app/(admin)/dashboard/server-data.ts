import { pool } from "@/lib/db";

export async function getDashboardStats() {
  const totalSchools = await pool.query(
    `SELECT COUNT(*) FROM schools`
  );

  const totalPrograms = await pool.query(
    `SELECT COUNT(*) FROM programs`
  );

  return [
    {
      title: "Total Schools",
      value: Number(totalSchools.rows[0].count).toLocaleString(),
      type: "number",
      change: 0,
      icon: "solar:bill-list-bold-duotone",
      bgColor: "primary-subtle",
      textColor: "primary",
      description: " Database count",
      isTrue: false,
    },
    {
      title: "Total Programs",
      value: Number(totalPrograms.rows[0].count).toLocaleString(),
      type: "number",
      change: 0,
      icon: "solar:wad-of-money-bold-duotone",
      bgColor: "success-subtle",
      textColor: "success",
      description: "Database count",
      isTrue: false,
    },
  ];
}