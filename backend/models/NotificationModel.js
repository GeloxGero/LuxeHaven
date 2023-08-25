import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
	{
		user: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
			default: "Unread",
		},
	},
	{
		timestamps: true,
	}
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
