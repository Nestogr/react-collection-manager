import { Router } from "express";
import { ItemController } from "../controllers/item.controller.js";

const router = Router();

router.get("/", ItemController.list);
router.get("/:id", ItemController.show);
router.post("/", ItemController.create);
router.put("/:id", ItemController.update);
router.delete("/:id", ItemController.destroy);

export default router;
