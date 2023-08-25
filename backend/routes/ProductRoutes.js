import express from "express";
const router = express.Router();
import {
	addNewProduct,
	updateProduct,
	getAllProducts,
	deleteProduct,
} from "../controllers/ProductController.js";

router.get("/", getAllProducts);
router.put("/", updateProduct);
router.post("/", addNewProduct);
router.delete("/", deleteProduct);

export default router;
