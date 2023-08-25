import mongoose from "mongoose";
import Category from "./CategoryModel.js";

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Category",
			required: true,
		},
		description: { type: String, required: true },
		reviews: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Review",
		},
		rating: {
			type: Number,
			required: true,
		},
		status: { type: String, required: true, default: "Stocked" },
		sales: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

productSchema.pre("save", async function (next) {
	var item = this;

	if (item.isNew) {
		await Category.findByIdAndUpdate(item.category, {
			$inc: { quantity: item.quantity },
		})
			.then((doc) => {
				console.log("Document updated");
			})
			.catch((err) => {
				return next(err);
			});
	}
	next();
});

productSchema.pre("findOneAndUpdate", async function (next) {
	const item = await this.model.findOne(this.getQuery());
	const update = this.getUpdate();
	const difference = item.quantity - update.quantity;

	await Category.findByIdAndUpdate(item.category, {
		$inc: { quantity: -difference },
	})
		.then((doc) => {
			console.log(`Document updated`);
		})
		.catch((err) => {
			console.log(new Error(`Error: ${err}`));
		});

	next();
});

productSchema.pre("deleteOne", async function (next) {
	const item = await Product.findById(this.getQuery()._id);

	await Category.findByIdAndUpdate(item.category, {
		$inc: { quantity: -item.quantity },
	})
		.then((doc) => {
			console.log(`Document deleted`);
		})
		.catch((err) => {
			console.log(new Error(`Error: ${err}`));
		});

	next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
