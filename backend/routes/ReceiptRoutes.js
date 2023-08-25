import express from "express";
const router = express.Router();
import {
	addNewReceipt,
	updateReceipt,
	getAllReceipts,
	deleteReceipt,
} from "../controllers/ReceiptController.js";

router.get("/", getAllReceipts);
router.put("/", updateReceipt);
router.post("/", addNewReceipt);
router.delete("/", deleteReceipt);

export default router;
