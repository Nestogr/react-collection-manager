import type {Request, Response} from "express";
import {
    createAttribute,
    deleteAttribute,
    getAttributeById,
    getAttributes,
    updateAttribute
} from "../models/attribute.model.js";

export class AttributeController {
    static async list(req: Request, res: Response) {
        try {

            const response = await getAttributes();
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({error: "Failed to fetch attributes"});
        }
    }

    static async show(req: Request, res: Response) {
        try {
            const response = await getAttributeById(Number(req.params.id));
            return response ? res.status(200).json(response) : res.status(404).json({error: "Attribute not found"});
        } catch (error) {
            return res.status(500).json({error: "Failed to fetch attribute"});
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const result = await createAttribute(req.body.name, req.body.dataType);
            return res.status(201).json(result)
        } catch (error) {
            return res.status(500).json({error: "Failed to create attribute"});
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const result = await updateAttribute(Number(req.params.id), req.body.name, req.body.dataType)
            return result.affectedRows === 0 ? res.status(404).json({error: "Attribute not found"}) : res.status(200).json({
                id: Number(req.params.id),
                name: req.body.name,
                dataType: req.body.dataType,
            });
        } catch (error) {
            return res.status(500).json({error: "Failed to update attribute"});
        }
    }

    static async destroy(req: Request, res: Response) {
        try {
            const result = await deleteAttribute(Number(req.params.id))
            return result.affectedRows === 0 ? res.status(404).json({error: "Attribute not found"}) : res.status(204).json();
        } catch (error) {
            return res.status(500).json({error: "Failed to delete attribute"});
        }
    }
}