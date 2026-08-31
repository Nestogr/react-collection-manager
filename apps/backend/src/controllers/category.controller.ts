import type {Request, Response} from "express";
import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategoryById,
    updateCategory
} from "../models/category.model.js";

export class CategoryController {
    static async list(req: Request, res: Response) {
        try {
            const response = await getCategories();
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({error: "Failed to fetch categories"});
        }
    }

    static async show(req: Request, res: Response) {
        try {
            const response = await getCategoryById(Number(req.params.id));
            return response ? res.status(200).json(response) : res.status(404).json({error: "Category not found"});
        } catch (error) {
            return res.status(500).json({error: "Failed to fetch category"});
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const result = await createCategory(req.body.name, req.body.description ?? null);
            return res.status(201).json({
                id: result.id, name: result.name, description: result.description
            })
        } catch (error) {
            return res.status(500).json({error: "Failed to create category"});
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const result = await updateCategory(Number(req.params.id), req.body.name, req.body.description ?? null)
            return result.affectedRows === 0 ? res.status(404).json({error: "Category not found"}) : res.status(200).json({
                id: req.params.id,
                name: req.body.name,
                description: req.body.description ?? null,
            });
        } catch (error) {
            return res.status(500).json({error: "Failed to update category"});
        }
    }

    static async destroy(req: Request, res: Response) {
        try {
            const result = await deleteCategory(Number(req.params.id))
            return result.affectedRows === 0 ? res.status(404).json({error: "Category not found"}) : res.status(204).json();
        } catch (error) {
            return res.status(500).json({error: "Failed to update category"});
        }
    }
}