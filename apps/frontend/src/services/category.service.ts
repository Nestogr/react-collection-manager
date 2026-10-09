import { apiClient } from "./apiClient";
import type { Category } from "shared";

export async function getCategories(): Promise<Category[]> {
  const response = await apiClient.get<Category[]>("/categories");
  return response.data;
}

export async function getCategoryById(id: number): Promise<Category> {
  const response = await apiClient.get<Category>(`/categories/${id}`);
  return response.data;
}

export async function createCategory(
  name: string,
  description: string | null
): Promise<Category> {
  const response = await apiClient.post<Category>("/categories", { name, description });
  return response.data;
}

export async function updateCategory(
  id: number,
  name: string,
  description: string | null
): Promise<Category> {
  const response = await apiClient.put<Category>(`/categories/${id}`, { name, description });
  return response.data;
}

export async function deleteCategory(id: number): Promise<void> {
  await apiClient.delete(`/categories/${id}`);
}
