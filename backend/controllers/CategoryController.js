import asyncHandler from "express-async-handler";
import Category from "../models/CategoryModel.js";

const getAllCategories = asyncHandler(async (req, res) => {
	const categories = await Category.find().lean();

	// If no categories
	if (!categories?.length) {
		return res.status(400).json({ message: "No Categories found" });
	}

	res.json(categories);
});

const addNewCategory = asyncHandler(async (req, res) => {
	const { name, quantity } = req.body;

	// Confirm data
	if (!name || !quantity) {
		return res.status(400).json({
			message: "All fields required",
		});
	}

	// Create and store the new category
	const newCategory = await Category.create({
		name,
		quantity,
	});

	if (newCategory) {
		// Created Category
		return res.status(201).json({ message: "New Category Created" });
	} else {
		return res.status(400).json({ message: "Invalid data received" });
	}
});

const updateCategory = asyncHandler(async (req, res) => {
	const { id, name, category } = req.body;

	// Confirm data
	if (!id || !name || !category) {
		return res.status(400).json({ message: "All fields are required" });
	}

	const updatedCategory = await Category.findOneAndUpdate(
		{ _id: id },
		{ name, category }
	);

	if (!updatedCategory) res.json({ message: "Invalid values" });

	res.json({
		message: `Updated Category ${updatedCategory.name}`,
	});
});

const deleteCategory = asyncHandler(async (req, res) => {
	//delete all categories branching out from this category

	const { id } = req.body;

	if (!id) {
		return res.status(400).json({ message: "Category Id required" });
	}

	const category = await Category.findById(id).exec();

	if (!category) {
		return res.status(400).json({ message: "Category not found" });
	}

	const result = await category.deleteOne();
	res.json(`Category ${result._id} ${result.name} deleted`);
});

export { getAllCategories, addNewCategory, updateCategory, deleteCategory };
