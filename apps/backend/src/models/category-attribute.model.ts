import { pool } from "../db.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface CategoryAttribute {
  id: number;
  categoryId: number;
  attributeId: number;
  required: boolean;
}

export interface CategoryAttributeWithAttribute {
  id: number;
  categoryId: number;
  attributeId: number;
  required: boolean;
  attributeName: string;
  attributeDataType: "text" | "number" | "date";
}

export async function getAttributesByCategory(
  categoryId: number
): Promise<CategoryAttributeWithAttribute[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT
             category_attributes.id,
             category_attributes.category_id,
             category_attributes.attribute_id,
             category_attributes.required,
             attributes.name AS attribute_name,
             attributes.data_type AS attribute_data_type
         FROM category_attributes
                  JOIN attributes ON category_attributes.attribute_id = attributes.id
         WHERE category_attributes.category_id = ?`,
    [categoryId]
  );
  return rows.map((row) => ({
    id: row.id,
    categoryId: row.category_id,
    attributeId: row.attribute_id,
    required: Boolean(row.required),
    attributeName: row.attribute_name,
    attributeDataType: row.attribute_data_type,
  })) as CategoryAttributeWithAttribute[];
}

export async function assignAttribute(
  categoryId: number,
  attributeId: number,
  required: boolean
): Promise<CategoryAttribute> {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO category_attributes (category_id, attribute_id, required) VALUES (?, ?, ?)`,
    [categoryId, attributeId, required]
  );
  return {
    id: result.insertId,
    categoryId,
    attributeId,
    required,
  };
}

export async function unassignAttribute(
  categoryId: number,
  attributeId: number
): Promise<ResultSetHeader> {
  const [result] = await pool.query<ResultSetHeader>(
    `DELETE FROM category_attributes WHERE category_id = ? AND attribute_id = ?`,
    [categoryId, attributeId]
  );
  return result;
}
