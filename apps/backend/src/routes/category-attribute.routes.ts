import { Router } from "express";
import { CategoryAttributeController } from "../controllers/category-attribute.controller.js";

const router = Router();

router.get("/:categoryId/attributes", CategoryAttributeController.list);
router.post("/:categoryId/attributes", CategoryAttributeController.create);
router.put("/:categoryId/attributes/:attributeId", CategoryAttributeController.update);
router.delete("/:categoryId/attributes/:attributeId", CategoryAttributeController.destroy);

export default router;
