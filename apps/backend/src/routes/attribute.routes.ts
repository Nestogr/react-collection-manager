import { Router } from "express";
import { AttributeController } from "../controllers/attribute.controller.js";

const router = Router();

router.get("/", AttributeController.list);
router.get("/:id", AttributeController.show);
router.post("/", AttributeController.create);
router.put("/:id", AttributeController.update);
router.delete("/:id", AttributeController.destroy);

export default router;
