import asyncHandler from "express-async-handler";
import Cart from "../models/CartModel.js";

const getAllCarts = asyncHandler(async (req, res) => {
	const carts = await Cart.find().lean();

	// If no carts
	if (!carts?.length) {
		return res.status(400).json({ message: "No Carts found" });
	}

	res.json(carts);
});

const addNewCart = asyncHandler(async (req, res) => {
	const { product, user, quantity, total } = req.body;

	// Confirm data
	if (!product || !user || !quantity || !total) {
		return res.status(400).json({
			message: "All fields required",
		});
	}

	// Create and store the new cart
	const newCart = await Cart.create({
		product,
		user,
		quantity,
		total,
	});

	if (newCart) {
		// Created Cart
		return res.status(201).json({ message: "New Cart Created" });
	} else {
		return res.status(400).json({ message: "Invalid data received" });
	}
});

const updateCart = asyncHandler(async (req, res) => {
	const { id, product, user, quantity, total } = req.body;

	// Confirm data
	if (!id || !product || !user || !quantity || !total) {
		return res.status(400).json({ message: "All fields are required" });
	}

	const updatedCart = await Cart.findOneAndUpdate(
		{ _id: id },
		{ product, user, quantity, total }
	);

	if (!updatedCart) res.json({ message: "Invalid values" });

	res.json({
		message: `Updated Cart ${updatedCart.name}`,
	});
});

const deleteCart = asyncHandler(async (req, res) => {
	//delete all carts branching out from this cart

	const { id } = req.body;

	const cart = await Cart.findById(id).exec();
	if (!cart) {
		res.status(401).json({ message: "Cart Not Found" });
	}

	const result = await Cart.deleteOne({ _id: id });
	res.status(200).json({ message: "Cart Deleted" });
});

export { getAllCarts, addNewCart, updateCart, deleteCart };
