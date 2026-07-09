export async function generateQuerySearch(
  tableName: string,
  filters: Record<string, any>,
  options?: {
    sort?: string;
    order?: "ASC" | "DESC";
    limit?: number;
    offset?: number;
  },
) {
  const allowedColumns = [
    "primary_id",
    "name",
    "email",
    "phone",
    "status",
    "created_at",
    "updated_at",
  ];

  if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
    throw new Error("Invalid table name");
  }

  const where: string[] = [];
  const values: any[] = [];

  for (const [key, value] of Object.entries(filters)) {
    if (!allowedColumns.includes(key)) continue;

    if (value === undefined || value === null || value === "") continue;

    if (typeof value === "string") {
      where.push(`\`${key}\` LIKE ?`);
      values.push(`%${value}%`);
    } else {
      where.push(`\`${key}\` = ?`);
      values.push(value);
    }
  }

  let sql = `SELECT * FROM \`${tableName}\``;

  if (where.length) {
    sql += ` WHERE ${where.join(" AND ")}`;
  }

  const sort =
    allowedColumns.includes(options?.sort || "")
      ? options!.sort
      : "primary_id";

  const order = options?.order === "ASC" ? "ASC" : "DESC";

  sql += ` ORDER BY \`${sort}\` ${order}`;

  if (options?.limit !== undefined) {
    sql += ` LIMIT ?`;
    values.push(options.limit);

    if (options.offset !== undefined && options.offset > 0) {
      sql += ` OFFSET ?`;
      values.push(options.offset);
    }
  }

  return {
    sql,
    values,
  };
}