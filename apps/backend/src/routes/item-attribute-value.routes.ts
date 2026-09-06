import { Router } from "express";
import { ItemAttributeValueController } from "../controllers/item-attribute-value.controller.js";

const router = Router();

router.get("/:itemId/attributes", ItemAttributeValueController.list);
router.post("/:itemId/attributes", ItemAttributeValueController.create);
router.put("/:itemId/attributes/:attributeId", ItemAttributeValueController.update);
router.delete("/:itemId/attributes/:attributeId", ItemAttributeValueController.destroy);

export default router;
