import mongoose from "mongoose";

const ticketSchema = mongoose.Schema(
	{
		user: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			required: true,
		},
		product: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Product",
			required: true,
		},
		description: { type: String, required: true },
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

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
