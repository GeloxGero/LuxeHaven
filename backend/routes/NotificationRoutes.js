import express from "express";
const router = express.Router();
import {
	addNewNotification,
	updateNotification,
	getAllNotifications,
	deleteNotification,
} from "../controllers/NotificationController.js";

router.get("/", getAllNotifications);
router.put("/", updateNotification);
router.post("/", addNewNotification);
router.delete("/", deleteNotification);

export default router;
