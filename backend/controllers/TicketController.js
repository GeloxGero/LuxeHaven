import asyncHandler from "express-async-handler";
import Ticket from "../models/TicketModel.js";

const getAllTickets = asyncHandler(async (req, res) => {
	const tickets = await Ticket.find().lean();

	// If no tickets
	if (!tickets?.length) {
		return res.status(400).json({ message: "No Tickets found" });
	}

	res.json(tickets);
});

const addNewTicket = asyncHandler(async (req, res) => {
	const { user, product, description, status } = req.body;

	// Confirm data
	if (!user || !product || !description || !status) {
		return res.status(400).json({
			message: "All fields required",
		});
	}

	// Create and store the new ticket
	const newTicket = await Ticket.create({
		user,
		product,
		description,
		status,
	});

	if (newTicket) {
		// Created Ticket
		return res.status(201).json({ message: "New Ticket Created" });
	} else {
		return res.status(400).json({ message: "Invalid data received" });
	}
});

const updateTicket = asyncHandler(async (req, res) => {
	const { id, user, product, description, status } = req.body;

	// Confirm data
	if (!id || !user || product || description || status) {
		return res.status(400).json({ message: "All fields are required" });
	}

	const updatedTicket = await Ticket.findOneAndUpdate(
		{ _id: id },
		{ user, product, description, status }
	);

	if (!updatedTicket) res.json({ message: "Invalid values" });

	res.json({
		message: `Updated Ticket ${updatedTicket.name}`,
	});
});

const deleteTicket = asyncHandler(async (req, res) => {
	//delete all tickets branching out from this ticket

	const { id } = req.body;

	const ticket = await Ticket.findById(id).exec();
	if (!ticket) {
		res.status(401).json({ message: "Ticket Not Found" });
	}

	const result = await Ticket.deleteOne({ _id: id });
	res.status(200).json({ message: "Ticket Deleted" });
});

export { getAllTickets, addNewTicket, updateTicket, deleteTicket };
