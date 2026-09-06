import { pool } from "../db.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export interface Item {
  id: number;
  name: string;
  categoryId: number;
  description: string | null;
  image: string | null;
}

function mapItem(row: RowDataPacket): Item {
  return {
    id: row.id,
    name: row.name,
    categoryId: row.category_id,
    description: row.description,
    image: row.image,
  };
}

export async function getItems(): Promise<Item[]> {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM items ORDER BY name");
  return rows.map(mapItem);
}

export async function getItemById(id: number): Promise<Item | null> {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM items WHERE id = ?", [id]);
  return rows[0] ? mapItem(rows[0]) : null;
}

export async function createItem(
  name: string,
  categoryId: number,
  description: string | null,
  image: string | null
): Promise<Item> {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO items (name, category_id, description, image) VALUES (?, ?, ?, ?)",
    [name, categoryId, description, image]
  );
  return { id: result.insertId, categoryId, name, description, image };
}

export async function updateItem(
  id: number,
  name: string,
  categoryId: number,
  description: string | null,
  image: string | null
): Promise<ResultSetHeader> {
  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE items SET name = ?, description = ?, category_id = ?, image = ? WHERE id = ?",
    [name, description, categoryId, image, id]
  );
  return result;
}

export async function deleteItem(id: number): Promise<ResultSetHeader> {
  const [result] = await pool.query<ResultSetHeader>("DELETE FROM items WHERE id = ?", [id]);
  return result;
}
