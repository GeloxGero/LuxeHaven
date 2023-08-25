import express from "express";
const router = express.Router();
import {
	addNewCart,
	updateCart,
	getAllCarts,
	deleteCart,
} from "../controllers/CartController.js";

router.get("/", getAllCarts);
router.put("/", updateCart);
router.post("/", addNewCart);
router.delete("/", deleteCart);

export default router;
