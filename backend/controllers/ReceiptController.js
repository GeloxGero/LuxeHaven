import asyncHandler from "express-async-handler";
import Receipt from "../models/ReceiptModel.js";

const getAllReceipts = asyncHandler(async (req, res) => {
	const receipts = await Receipt.find().lean();

	// If no receipts
	if (!receipts?.length) {
		return res.status(400).json({ message: "No Receipts found" });
	}

	res.json(receipts);
});

const addNewReceipt = asyncHandler(async (req, res) => {
	const { user, product, quantity, total, time, shipto, shipfrom } = req.body;

	// Confirm data
	if (
		!user ||
		!product ||
		!quantity ||
		!total ||
		!time ||
		!shipto ||
		!shipfrom
	) {
		return res.status(400).json({
			message: "All fields required",
		});
	}

	// Create and store the new receipt
	const newReceipt = await Receipt.create({
		user,
		product,
		quantity,
		total,
		time,
		shipto,
		shipfrom,
	});

	if (newReceipt) {
		// Created Receipt
		return res.status(201).json({ message: "New Receipt Created" });
	} else {
		return res.status(400).json({ message: "Invalid data received" });
	}
});

const updateReceipt = asyncHandler(async (req, res) => {
	const { id, user, product, quantity, total, time, shipto, shipfrom } =
		req.body;

	// Confirm data
	if (
		!id ||
		!user ||
		!product ||
		!quantity ||
		!total ||
		!time ||
		!shipto ||
		!shipfrom
	) {
		return res.status(400).json({ message: "All fields are required" });
	}

	const updatedReceipt = await Receipt.findOneAndUpdate(
		{ _id: id },
		{ user, product, quantity, total, time, shipto, shipfrom }
	);

	if (!updatedReceipt) res.json({ message: "Invalid values" });

	res.json({
		message: `Updated Receipt ${updatedReceipt.name}`,
	});
});

const deleteReceipt = asyncHandler(async (req, res) => {
	//delete all receipts branching out from this receipt

	const { id } = req.body;

	const receipt = await Receipt.findById(id).exec();
	if (!receipt) {
		res.status(401).json({ message: "Receipt Not Found" });
	}

	const result = await Receipt.deleteOne({ _id: id });
	res.status(200).json({ message: "Receipt Deleted" });
});

export { getAllReceipts, addNewReceipt, updateReceipt, deleteReceipt };
