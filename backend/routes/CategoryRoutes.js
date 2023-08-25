import express from "express";
const router = express.Router();
import {
	addNewCategory,
	updateCategory,
	getAllCategories,
	deleteCategory,
} from "../controllers/CategoryController.js";

router.get("/", getAllCategories);
router.put("/", updateCategory);
router.post("/", addNewCategory);
router.delete("/", deleteCategory);

export default router;
