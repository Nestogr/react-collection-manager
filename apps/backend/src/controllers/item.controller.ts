import type { Request, Response } from "express";
import { createItem, deleteItem, getItemById, getItems, updateItem } from "../models/item.model.js";

export class ItemController {
  static async list(req: Request, res: Response) {
    try {
      const response = await getItems();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch items" });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const response = await getItemById(Number(req.params.id));
      return response
        ? res.status(200).json(response)
        : res.status(404).json({ error: "Item not found" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch item" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const result = await createItem(
        req.body.name,
        req.body.categoryId,
        req.body.description ?? null,
        req.body.image ?? null
      );
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create item" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const result = await updateItem(
        Number(req.params.id),
        req.body.name,
        req.body.categoryId,
        req.body.description ?? null,
        req.body.image ?? null
      );
      return result.affectedRows === 0
        ? res.status(404).json({ error: "Item not found" })
        : res.status(200).json({
            id: Number(req.params.id),
            name: req.body.name,
            categoryId: req.body.categoryId,
            description: req.body.description ?? null,
            image: req.body.image ?? null,
          });
    } catch (error) {
      return res.status(500).json({ error: "Failed to update item" });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const result = await deleteItem(Number(req.params.id));
      return result.affectedRows === 0
        ? res.status(404).json({ error: "Item not found" })
        : res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete item" });
    }
  }
}
