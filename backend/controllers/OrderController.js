import asyncHandler from "express-async-handler";
import Order from "../models/OrderModel.js";

const getAllOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find().lean();

	// If no orders
	if (!orders?.length) {
		return res.status(400).json({ message: "No Orders found" });
	}

	res.json(orders);
});

const addNewOrder = asyncHandler(async (req, res) => {
	const {
		product,
		customer,
		seller,
		shipfrom,
		shipto,
		time,
		location,
		status,
	} = req.body;

	// Confirm data
	if (
		!product ||
		!customer ||
		!seller ||
		!shipfrom ||
		!shipto ||
		!time ||
		!location ||
		!status
	) {
		return res.status(400).json({
			message: "All fields required",
		});
	}

	// Create and store the new order
	const newOrder = await Order.create({
		product,
		customer,
		seller,
		shipfrom,
		shipto,
		time,
		location,
		status,
	});

	if (newOrder) {
		// Created Order
		return res.status(201).json({ message: "New Order Created" });
	} else {
		return res.status(400).json({ message: "Invalid data received" });
	}
});

const updateOrder = asyncHandler(async (req, res) => {
	const {
		id,
		product,
		customer,
		seller,
		shipfrom,
		shipto,
		time,
		location,
		status,
	} = req.body;

	// Confirm data
	if (
		!id ||
		!product ||
		!customer ||
		!seller ||
		!shipfrom ||
		!shipto ||
		!time ||
		!location ||
		!status
	) {
		return res.status(400).json({ message: "All fields are required" });
	}

	const updatedOrder = await Order.findOneAndUpdate(
		{ _id: id },
		{ product, customer, seller, shipfrom, shipto, time, location, status }
	);

	if (!updatedOrder) res.json({ message: "Invalid values" });

	res.json({
		message: `Updated Order ${updatedOrder.name}`,
	});
});

const deleteOrder = asyncHandler(async (req, res) => {
	//delete all orders branching out from this order

	const { id } = req.body;

	const order = await Order.findById(id).exec();
	if (!order) {
		res.status(401).json({ message: "Order Not Found" });
	}

	const result = await Order.deleteOne({ _id: id });
	res.status(200).json({ message: "Order Deleted" });
});

export { getAllOrders, addNewOrder, updateOrder, deleteOrder };
