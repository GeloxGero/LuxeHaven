import mongoose from "mongoose";

const receiptSchema = mongoose.Schema(
	{
		user: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			required: true,
		},
		product: [
			{
				type: [mongoose.Schema.Types.ObjectId],
				ref: "Product",
				required: true,
			},
		],
		quantity: {
			type: Number,
			required: true,
		},
		total: {
			type: Number,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
		shipto: {
			type: String,
			required: true,
		},
		shipfrom: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Receipt = mongoose.model("Receipt", receiptSchema);

export default Receipt;
