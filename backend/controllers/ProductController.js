import asyncHandler from "express-async-handler";
import Product from "../models/ProductModel.js";

const getAllProducts = asyncHandler(async (req, res) => {
	const products = await Product.find().lean();

	// If no products
	if (!products?.length) {
		return res.status(400).json({ message: "No Products found" });
	}

	res.json(products);
});

const addNewProduct = asyncHandler(async (req, res) => {
	const {
		name,
		quantity,
		price,
		category,
		description,
		reviews,
		rating,
		status,
		sales,
	} = req.body;

	//temporarily ensure image is never null or undefined

	// Confirm data
	if (
		!name ||
		!quantity ||
		!price ||
		!category ||
		!description ||
		!reviews ||
		!rating ||
		!status ||
		!sales
	) {
		return res.status(400).json({
			message: "All fields required",
		});
	}

	// Create and store the new product
	const newProduct = await Product.create({
		name,
		quantity,
		price,
		category,
		description,
		reviews,
		rating,
		status,
		sales,
	});

	if (newProduct) {
		// Created Product
		return res.status(201).json({ message: "New Product Created" });
	} else {
		return res.status(400).json({ message: "Invalid data received" });
	}
});

const updateProduct = asyncHandler(async (req, res) => {
	const {
		id,
		name,
		quantity,
		price,
		category,
		description,
		reviews,
		rating,
		status,
		sales,
	} = req.body;

	// Confirm data
	if (
		!id ||
		!name ||
		!quantity ||
		!price ||
		!category ||
		!description ||
		!reviews ||
		!rating ||
		!status ||
		!sales
	) {
		return res.status(400).json({ message: "All fields are required" });
	}

	const updatedProduct = await Product.findOneAndUpdate(
		{ _id: id },
		{
			name,
			quantity,
			price,
			category,
			description,
			reviews,
			rating,
			status,
			sales,
		}
	);

	if (!updatedProduct) res.json({ message: "Invalid values" });

	res.json({
		message: `Updated Product ${updatedProduct.name}`,
	});
});

const deleteProduct = asyncHandler(async (req, res) => {
	//delete all products branching out from this product

	const { id } = req.body;

	const product = await Product.findById(id).exec();
	if (!product) {
		res.status(401).json({ message: "Product Not Found" });
	}

	const result = await Product.deleteOne({ _id: id });
	res.status(200).json({ message: "Product Deleted" });
});

export { getAllProducts, addNewProduct, updateProduct, deleteProduct };
