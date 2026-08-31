import {pool} from "../db.js";
import type {ResultSetHeader, RowDataPacket} from "mysql2";

export interface Category {
    id: number;
    name: string;
    description: string | null;
}

export async function getCategories(): Promise<Category[]> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM categories ORDER BY name");
    return rows as Category[];
}

export async function getCategoryById(id: number): Promise<Category | null> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM categories WHERE id = ?", [id])
    return rows[0] as Category ?? null;
}

export async function createCategory(name: string, description: string | null): Promise<Category> {
    const [result] = await pool.query<ResultSetHeader>("INSERT INTO categories (name, description) VALUES (?, ?)", [name, description])
    return {id: result.insertId, name, description};
}

export async function updateCategory(id: number, name: string, description: string | null): Promise<ResultSetHeader> {
    const [result] = await pool.query<ResultSetHeader>("UPDATE categories SET name = ?, description = ? WHERE id = ?", [name, description, id])
    return result;
}

export async function deleteCategory(id: number): Promise<ResultSetHeader> {
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM categories WHERE id = ?", [id])
    return result;
}