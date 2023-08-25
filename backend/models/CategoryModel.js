import mongoose from "mongoose";
import Product from "./ProductModel.js";

const categorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

categorySchema.pre("save", function (next) {
	var category = this;
	if (category.isNew) {
		category.quantity = 0;
	}
	next();
});

categorySchema.pre(
	"deleteOne",
	{ document: true, query: false },
	async function (next) {
		const object = await Product.deleteMany({ category: this._id });
		console.log(`Deleted ${object.deletedCount} Items`);
		console.log(object);
		next();
	}
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
