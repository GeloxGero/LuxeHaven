import asyncHandler from "express-async-handler";
import Review from "../models/ReviewModel.js";

const getAllReviews = asyncHandler(async (req, res) => {
	const reviews = await Review.find().lean();

	// If no reviews
	if (!reviews?.length) {
		return res.status(400).json({ message: "No Reviews found" });
	}

	res.json(reviews);
});

const addNewReview = asyncHandler(async (req, res) => {
	const { user, product, description, rating } = req.body;

	// Confirm data
	if (!user || !product || !description || !rating) {
		return res.status(400).json({
			message: "All fields required",
		});
	}

	// Create and store the new review
	const newReview = await Review.create({
		user,
		product,
		description,
		rating,
	});

	if (newReview) {
		// Created Review
		return res.status(201).json({ message: "New Review Created" });
	} else {
		return res.status(400).json({ message: "Invalid data received" });
	}
});

const updateReview = asyncHandler(async (req, res) => {
	const { id, user, product, description, rating } = req.body;

	// Confirm data
	if (!id || !user || !product || !description || !rating) {
		return res.status(400).json({ message: "All fields are required" });
	}

	const updatedReview = await Review.findOneAndUpdate(
		{ _id: id },
		{ user, product, description, rating }
	);

	if (!updatedReview) res.json({ message: "Invalid values" });

	res.json({
		message: `Updated Review ${updatedReview.name}`,
	});
});

const deleteReview = asyncHandler(async (req, res) => {
	//delete all reviews branching out from this review

	const { id } = req.body;

	const review = await Review.findById(id).exec();
	if (!review) {
		res.status(401).json({ message: "Review Not Found" });
	}

	const result = await Review.deleteOne({ _id: id });
	res.status(200).json({ message: "Review Deleted" });
});

export { getAllReviews, addNewReview, updateReview, deleteReview };
