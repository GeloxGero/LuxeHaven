import { faker } from "@faker-js/faker";
import Product from "../models/ProductModel.js";
import Category from "../models/CategoryModel.js";

async function seedProduct() {
	await Product.deleteMany({});

	const categories = await Category.find({});
	for (let i = 0; i < 50; i++) {
		const category = categories[Math.floor(Math.random() * categories.length)];

		const product = new Product({
			name: faker.commerce.product(),
			quantity: faker.number.int({ min: 1, max: 32 }),
			price: faker.commerce.price(),
			category: category._id,
			description: faker.commerce.productDescription(),
			rating: faker.number.int({ min: 1, max: 5 }),
			status: "Stocked",
			sales: faker.number.int({ min: 0, max: 100 }),
		});

		await product.save();
		console.log("Product" + (i + 1));
	}
}

export default seedProduct;
