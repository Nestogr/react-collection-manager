import type { Request, Response } from "express";
import {
  getAttributesByCategory,
  assignAttribute,
  updateAttribute,
  unassignAttribute,
} from "../models/category-attribute.model.js";

export class CategoryAttributeController {
  static async list(req: Request, res: Response) {
    try {
      const categoryId = Number(req.params.categoryId);
      const response = await getAttributesByCategory(categoryId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch category attributes" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const categoryId = Number(req.params.categoryId);
      const result = await assignAttribute(
        categoryId,
        Number(req.body.attributeId),
        req.body.required ?? false
      );
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Failed to assign attribute" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const categoryId = Number(req.params.categoryId);
      const attributeId = Number(req.params.attributeId);
      const result = await updateAttribute(categoryId, attributeId, req.body.required ?? false);
      return result.affectedRows === 0
        ? res.status(404).json({ error: "Category-Attribute relation not found" })
        : res.status(200).json({
            categoryId,
            attributeId,
            required: req.body.required ?? false,
          });
    } catch (error) {
      return res.status(500).json({ error: "Failed to update attribute" });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const categoryId = Number(req.params.categoryId);
      const attributeId = Number(req.params.attributeId);
      const result = await unassignAttribute(categoryId, attributeId);
      return result.affectedRows === 0
        ? res.status(404).json({ error: "Category-Attribute relation not found" })
        : res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: "Failed to unassign attribute" });
    }
  }
}
