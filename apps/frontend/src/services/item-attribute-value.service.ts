import { apiClient } from "./apiClient";
import type { ItemAttributeValue, ItemAttributeValueWithAttribute } from "shared";

export async function getItemAttributes(
  itemId: number
): Promise<ItemAttributeValueWithAttribute[]> {
  const response = await apiClient.get<ItemAttributeValueWithAttribute[]>(
    `/items/${itemId}/attributes`
  );
  return response.data;
}

export async function assignItemAttribute(
  itemId: number,
  attributeId: number,
  value: string
): Promise<ItemAttributeValue> {
  const response = await apiClient.post<ItemAttributeValue>(`/items/${itemId}/attributes`, {
    attributeId,
    value,
  });
  return response.data;
}

export async function updateItemAttribute(
  itemId: number,
  attributeId: number,
  value: string
): Promise<ItemAttributeValue> {
  const response = await apiClient.put<ItemAttributeValue>(
    `/items/${itemId}/attributes/${attributeId}`,
    { value }
  );
  return response.data;
}

export async function unassignItemAttribute(itemId: number, attributeId: number): Promise<void> {
  await apiClient.delete(`/items/${itemId}/attributes/${attributeId}`);
}
