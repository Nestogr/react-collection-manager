export interface CategoryAttribute {
  id: number;
  categoryId: number;
  attributeId: number;
  required: boolean;
}

export interface CategoryAttributeWithAttribute extends CategoryAttribute {
  attributeName: string;
  attributeDataType: "text" | "number" | "date";
}
