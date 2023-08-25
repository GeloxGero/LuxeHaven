import express from "express";
const router = express.Router();
import {
	addNewReview,
	updateReview,
	getAllReviews,
	deleteReview,
} from "../controllers/ReviewController.js";

router.get("/", getAllReviews);
router.put("/", updateReview);
router.post("/", addNewReview);
router.delete("/", deleteReview);

export default router;
