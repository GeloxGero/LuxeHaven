import { faker } from "@faker-js/faker";
import Category from "../models/CategoryModel.js";

async function seedCategory() {
	await Category.deleteMany({});

	for (let i = 0; i < 10; i++) {
		const category = new Category({
			name: faker.commerce.department(),
			quantity: 0,
		});

		await category.save();

		console.log("Category" + (i + 1));
	}
}

export default seedCategory;
