import { pool } from "../db.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export interface Attribute {
  id: number;
  name: string;
  dataType: "text" | "number" | "date";
}

function mapAttribute(row: RowDataPacket): Attribute {
  return {
    id: row.id,
    name: row.name,
    dataType: row.data_type,
  };
}

export async function getAttributes(): Promise<Attribute[]> {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM attributes ORDER BY name");
  return rows.map(mapAttribute);
}

export async function getAttributeById(id: number): Promise<Attribute | null> {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM attributes WHERE id = ?", [id]);
  return rows[0] ? mapAttribute(rows[0]) : null;
}

export async function createAttribute(
  name: string,
  dataType: "text" | "number" | "date"
): Promise<Attribute> {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO attributes (name, data_type) VALUES (?, ?)",
    [name, dataType]
  );
  return { id: result.insertId, name, dataType };
}

export async function updateAttribute(
  id: number,
  name: string,
  dataType: "text" | "number" | "date"
): Promise<ResultSetHeader> {
  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE attributes SET name = ?, data_type = ? WHERE id = ?",
    [name, dataType, id]
  );
  return result;
}

export async function deleteAttribute(id: number): Promise<ResultSetHeader> {
  const [result] = await pool.query<ResultSetHeader>("DELETE FROM attributes WHERE id = ?", [id]);
  return result;
}
