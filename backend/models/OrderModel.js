import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
	{
		product: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Product",
			required: true,
		},
		customer: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			required: true,
		},
		seller: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			required: true,
		},
		shipfrom: {
			type: String,
			required: true,
		},
		shipto: {
			type: String,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
			default: "Ongoing",
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
