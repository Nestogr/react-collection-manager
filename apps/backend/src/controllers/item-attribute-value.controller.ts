import type { Request, Response } from "express";
import {
  getAttributesByItem,
  assignAttribute,
  updateAttribute,
  unassignAttribute,
} from "../models/item-attribute-value.model.js";

export class ItemAttributeValueController {
  static async list(req: Request, res: Response) {
    try {
      const itemId = Number(req.params.itemId);
      const response = await getAttributesByItem(itemId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch item attributes" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const itemId = Number(req.params.itemId);
      const result = await assignAttribute(itemId, Number(req.body.attributeId), req.body.value);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Failed to assign attribute" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const itemId = Number(req.params.itemId);
      const attributeId = Number(req.params.attributeId);
      const result = await updateAttribute(itemId, attributeId, req.body.value);
      return result.affectedRows === 0
        ? res.status(404).json({ error: "Item-Attribute relation not found" })
        : res.status(200).json({
            itemId,
            attributeId,
            value: req.body.value,
          });
    } catch (error) {
      return res.status(500).json({ error: "Failed to update attribute" });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const itemId = Number(req.params.itemId);
      const attributeId = Number(req.params.attributeId);
      const result = await unassignAttribute(itemId, attributeId);
      return result.affectedRows === 0
        ? res.status(404).json({ error: "Item-Attribute relation not found" })
        : res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: "Failed to unassign attribute" });
    }
  }
}
