import express from "express";
const router = express.Router();
import {
	addNewTicket,
	updateTicket,
	getAllTickets,
	deleteTicket,
} from "../controllers/TicketController.js";

router.get("/", getAllTickets);
router.put("/", updateTicket);
router.post("/", addNewTicket);
router.delete("/", deleteTicket);

export default router;
