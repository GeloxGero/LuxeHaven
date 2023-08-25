import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
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
		rating: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
