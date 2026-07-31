import { pool } from "@/lib/db";

async function getTableCount(tableName: string) {
  try {
    const result = await pool.query(`SELECT COUNT(*)::int AS count FROM ${tableName}`);
    return Number(result.rows[0]?.count ?? 0);
  } catch (error) {
    console.error(`Failed to fetch count for ${tableName}:`, error);
    return 0;
  }
}

export async function getDashboardStats() {
  const [totalSchools, totalPrograms] = await Promise.all([
    getTableCount("schools"),
    getTableCount("programs"),
  ]);

  return [
    {
      title: "Total Schools",
      value: totalSchools.toLocaleString(),
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
      value: totalPrograms.toLocaleString(),
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