import {Router} from "express"
import {CategoryController} from "../controllers/category.controller.js"

const router = Router();

router.get("/", CategoryController.list);
router.get("/:id", CategoryController.show);
router.post("/", CategoryController.create);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.destroy);

export default router;