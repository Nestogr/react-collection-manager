import { apiClient } from "./apiClient";
import type { Item } from "shared";

export async function getItems(): Promise<Item[]> {
  const response = await apiClient.get<Item[]>("/items");
  return response.data;
}

export async function getItemById(id: number): Promise<Item> {
  const response = await apiClient.get<Item>(`/items/${id}`);
  return response.data;
}

export async function createItem(
  name: string,
  categoryId: number,
  description: string | null,
  image: string | null
): Promise<Item> {
  const response = await apiClient.post<Item>("/items", { name, categoryId, description, image });
  return response.data;
}

export async function updateItem(
  id: number,
  name: string,
  categoryId: number,
  description: string | null,
  image: string | null
): Promise<Item> {
  const response = await apiClient.put<Item>(`/items/${id}`, {
    name,
    categoryId,
    description,
    image,
  });
  return response.data;
}

export async function deleteItem(id: number): Promise<void> {
  await apiClient.delete(`/items/${id}`);
}
