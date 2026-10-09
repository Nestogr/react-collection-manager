import { apiClient } from "./apiClient";
import type { CategoryAttribute, CategoryAttributeWithAttribute } from "shared";

export async function getCategoryAttributes(
  categoryId: number
): Promise<CategoryAttributeWithAttribute[]> {
  const response = await apiClient.get<CategoryAttributeWithAttribute[]>(
    `/categories/${categoryId}/attributes`
  );
  return response.data;
}

export async function assignCategoryAttribute(
  categoryId: number,
  attributeId: number,
  required: boolean
): Promise<CategoryAttribute> {
  const response = await apiClient.post<CategoryAttribute>(
    `/categories/${categoryId}/attributes`,
    { attributeId, required }
  );
  return response.data;
}

export async function updateCategoryAttribute(
  categoryId: number,
  attributeId: number,
  required: boolean
): Promise<CategoryAttribute> {
  const response = await apiClient.put<CategoryAttribute>(
    `/categories/${categoryId}/attributes/${attributeId}`,
    { required }
  );
  return response.data;
}

export async function unassignCategoryAttribute(
  categoryId: number,
  attributeId: number
): Promise<void> {
  await apiClient.delete(`/categories/${categoryId}/attributes/${attributeId}`);
}
