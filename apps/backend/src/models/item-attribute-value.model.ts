import { pool } from "../db.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export interface ItemAttributeValue {
  id: number;
  itemId: number;
  attributeId: number;
  value: string;
}

export interface ItemAttributeValueWithAttribute extends ItemAttributeValue {
  attributeName: string;
}

function mapItemAttributeValueWithAttribute(row: RowDataPacket): ItemAttributeValueWithAttribute {
  return {
    id: row.id,
    itemId: row.item_id,
    attributeId: row.attribute_id,
    value: row.value,
    attributeName: row.attribute_name,
  };
}

export async function getAttributesByItem(
  itemId: number
): Promise<ItemAttributeValueWithAttribute[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT
       item_attribute_values.id,
       item_attribute_values.item_id,
       item_attribute_values.attribute_id,
       item_attribute_values.value,
       attributes.name AS attribute_name
         FROM item_attribute_values
                  JOIN attributes ON item_attribute_values.attribute_id = attributes.id
         WHERE item_attribute_values.item_id = ?`,
    [itemId]
  );
  return rows.map(mapItemAttributeValueWithAttribute);
}

export async function assignAttribute(
  itemId: number,
  attributeId: number,
  value: string
): Promise<ItemAttributeValue> {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO item_attribute_values (item_id, attribute_id, value) VALUES (?, ?, ?)`,
    [itemId, attributeId, value]
  );
  return {
    id: result.insertId,
    itemId,
    attributeId,
    value,
  };
}

export async function updateAttribute(
  itemId: number,
  attributeId: number,
  value: string
): Promise<ResultSetHeader> {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE item_attribute_values SET value = ? WHERE item_id = ? AND attribute_id = ?`,
    [value, itemId, attributeId]
  );
  return result;
}

export async function unassignAttribute(
  itemId: number,
  attributeId: number
): Promise<ResultSetHeader> {
  const [result] = await pool.query<ResultSetHeader>(
    `DELETE FROM item_attribute_values WHERE item_id = ? AND attribute_id = ?`,
    [itemId, attributeId]
  );
  return result;
}
