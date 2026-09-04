import type { Request, Response } from "express";
import {
  getAttributesByCategory,
  assignAttribute,
  unassignAttribute,
} from "../models/category-attribute.model.js";

export class CategoryAttributeController {
  static async list(req: Request, res: Response) {
    try {
      const response = await getAttributesByCategory(Number(req.params.categoryId));
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch attributes" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const result = await assignAttribute(
        Number(req.params.categoryId),
        Number(req.body.attributeId),
        req.body.required
      );
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Failed to assign attribute" });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const result = await unassignAttribute(
        Number(req.params.categoryId),
        Number(req.params.attributeId)
      );
      return result.affectedRows === 0
        ? res.status(404).json({ error: "Category-Attribute relation not found" })
        : res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: "Failed to unassign attribute" });
    }
  }
}
