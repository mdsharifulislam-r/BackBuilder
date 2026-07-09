function sanitizeSelectColumns(input?: string) {
  if (!input || input.trim() === "" || input.trim() === "*") {
    return "*";
  }

  const columns = input
    .split(",")
    .map((column) => column.trim())
    .filter(Boolean);

  const validColumns = columns.filter((column) => /^[a-zA-Z0-9_]+$/.test(column));

  return validColumns.length
    ? validColumns.map((column) => `\`${column}\``).join(", ")
    : "*";
}

function sanitizeSearchColumns(input?: string | string[] | null) {
  const values = Array.isArray(input)
    ? input
    : input
      ? input.split(",")
      : [];

  return values
    .map((column) => String(column).trim())
    .filter(Boolean)
    .filter((column) => /^[a-zA-Z0-9_]+$/.test(column));
}

export async function generateQuerySearch(
  tableName: string,
  filters: Record<string, any>,
  options?: {
    sort?: string;
    order?: "ASC" | "DESC";
    limit?: number;
    offset?: number;
    select?: string;
    search?: string;
    searchFields?: string[] | string;
  },
) {
  if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
    throw new Error("Invalid table name");
  }

  const where: string[] = [];
  const values: any[] = [];

  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === null || value === "") continue;

    if (typeof value === "string") {
      where.push(`\`${key}\` LIKE ?`);
      values.push(`%${value}%`);
    } else {
      where.push(`\`${key}\` = ?`);
      values.push(value);
    }
  }

  const searchTerm = options?.search?.trim();
  const searchableColumns = sanitizeSearchColumns(options?.searchFields);


  if (searchTerm) {
    const columnsToSearch = searchableColumns.length
      ? searchableColumns
      :[]
    const searchClauses = columnsToSearch.map((column) => `\`${column}\` LIKE ?`);
    where.push(`(${searchClauses.join(" OR ")})`);
    values.push(...columnsToSearch.map(() => `%${searchTerm}%`));
  }

  let sql = `SELECT ${sanitizeSelectColumns(options?.select)} FROM \`${tableName}\``;

  if (where.length) {
    sql += ` WHERE ${where.join(" AND ")}`;
  }

  const sort = options?.sort ? options.sort : "primary_id";
  const order = options?.order === "ASC" ? "ASC" : "DESC";
  const safeLimit = Number.isFinite(options?.limit)
    ? Math.max(Math.floor(options!.limit!), 1)
    : undefined;
  const safeOffset = Number.isFinite(options?.offset)
    ? Math.max(Math.floor(options!.offset!), 0)
    : undefined;

  sql += ` ORDER BY \`${sort}\` ${order}`;

  if (safeLimit !== undefined) {
    sql += ` LIMIT ${safeLimit}`;

    if (safeOffset !== undefined && safeOffset > 0) {
      sql += ` OFFSET ${safeOffset}`;
    }
  }

  return {
    sql,
    values,
  };
}