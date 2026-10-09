import { apiClient } from "./apiClient";
import type { Attribute } from "shared";

export async function getAttributes(): Promise<Attribute[]> {
  const response = await apiClient.get<Attribute[]>("/attributes");
  return response.data;
}

export async function getAttributeById(id: number): Promise<Attribute> {
  const response = await apiClient.get<Attribute>(`/attributes/${id}`);
  return response.data;
}

export async function createAttribute(
  name: string,
  dataType: Attribute["dataType"]
): Promise<Attribute> {
  const response = await apiClient.post<Attribute>("/attributes", { name, dataType });
  return response.data;
}

export async function updateAttribute(
  id: number,
  name: string,
  dataType: Attribute["dataType"]
): Promise<Attribute> {
  const response = await apiClient.put<Attribute>(`/attributes/${id}`, { name, dataType });
  return response.data;
}

export async function deleteAttribute(id: number): Promise<void> {
  await apiClient.delete(`/attributes/${id}`);
}
