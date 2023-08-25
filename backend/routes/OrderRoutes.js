import express from "express";
const router = express.Router();
import {
	addNewOrder,
	updateOrder,
	getAllOrders,
	deleteOrder,
} from "../controllers/OrderController.js";

router.get("/", getAllOrders);
router.put("/", updateOrder);
router.post("/", addNewOrder);
router.delete("/", deleteOrder);

export default router;
