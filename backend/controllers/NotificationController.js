import asyncHandler from "express-async-handler";
import Notification from "../models/NotificationModel.js";

const getAllNotifications = asyncHandler(async (req, res) => {
	const notifications = await Notification.find().lean();

	// If no notifications
	if (!notifications?.length) {
		return res.status(400).json({ message: "No Notifications found" });
	}

	res.json(notifications);
});

const addNewNotification = asyncHandler(async (req, res) => {
	const { user, description, status } = req.body;

	// Confirm data
	if (!user || !description || !status) {
		return res.status(400).json({
			message: "All fields required",
		});
	}

	// Create and store the new notification
	const newNotification = await Notification.create({
		user,
		description,
		status,
	});

	if (newNotification) {
		// Created Notification
		return res.status(201).json({ message: "New Notification Created" });
	} else {
		return res.status(400).json({ message: "Invalid data received" });
	}
});

const updateNotification = asyncHandler(async (req, res) => {
	const { id, user, description, status } = req.body;

	// Confirm data
	if (!id || !user || !description || !status) {
		return res.status(400).json({ message: "All fields are required" });
	}

	const updatedNotification = await Notification.findOneAndUpdate(
		{ _id: id },
		{ user, description, status }
	);

	if (!updatedNotification) res.json({ message: "Invalid values" });

	res.json({
		message: `Updated Notification ${updatedNotification.name}`,
	});
});

const deleteNotification = asyncHandler(async (req, res) => {
	//delete all notifications branching out from this notification

	const { id } = req.body;

	const notification = await Notification.findById(id).exec();
	if (!notification) {
		res.status(401).json({ message: "Notification Not Found" });
	}

	const result = await Notification.deleteOne({ _id: id });
	res.status(200).json({ message: "Notification Deleted" });
});

export {
	getAllNotifications,
	addNewNotification,
	updateNotification,
	deleteNotification,
};
