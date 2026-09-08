import { pool } from "../db.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

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

function mapCategoryAttributeWithAttribute(row: RowDataPacket): CategoryAttributeWithAttribute {
  return {
    id: row.id,
    categoryId: row.category_id,
    attributeId: row.attribute_id,
    required: Boolean(row.required),
    attributeName: row.attribute_name,
    attributeDataType: row.attribute_data_type,
  };
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
  return rows.map(mapCategoryAttributeWithAttribute);
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

export async function updateAttribute(
  categoryId: number,
  attributeId: number,
  required: boolean
): Promise<ResultSetHeader> {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE category_attributes SET required = ? WHERE category_id = ? AND attribute_id = ?`,
    [required, categoryId, attributeId]
  );
  return result;
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
