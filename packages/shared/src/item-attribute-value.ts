export interface ItemAttributeValue {
  id: number;
  itemId: number;
  attributeId: number;
  value: string;
}

export interface ItemAttributeValueWithAttribute extends ItemAttributeValue {
  attributeName: string;
}
