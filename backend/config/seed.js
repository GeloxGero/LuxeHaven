import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

import Category from "../models/CategoryModel.js";
import Notification from "../models/NotificationModel.js";
import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";

async function seedAndPopulate() {
	try {
		const conn = await mongoose.connect(
			"mongodb+srv://angelo:NPNGWKgwXdpETSlE@cluster0.40kkkmc.mongodb.net/LuxeHaven?retryWrites=true&w=majority",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}

	const generateRandomProductData = (categoryIDs) => {
		return {
			name: faker.commerce.productName(),
			quantity: faker.number.int({ min: 1, max: 100 }),
			price: faker.commerce.price(),
			category:
				categoryIDs[
					faker.number.int({
						min: 1,
						max: categoryIDs.length,
					})
				],
			description: faker.lorem.paragraph(),
			rating: faker.number.int({ min: 1, max: 5 }),
			sales: faker.number.int({ min: 0, max: 1000 }),
		};
	};

	const generateRandomUserData = () => {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const name = `${firstName} ${lastName}`;
		const password = faker.internet.password();
		const email = faker.internet.email({ firstName, lastName }).toLowerCase();

		return {
			name,
			password,
			email,
			type: "Customer",
			status: "Active",
		};
	};

	const generateRandomNotificationData = (userId) => {
		return {
			user: userId,
			description: faker.lorem.sentence(),
			status: faker.helpers.arrayElement(["Unread", "Read"]),
		};
	};

	const generateRandomCategoryData = () => {
		return {
			name: faker.commerce.department(),
			quantity: 0,
		};
	};

	try {
		await User.deleteMany({});
		await Category.deleteMany({});
		await Notification.deleteMany({});
		await Product.deleteMany({});

		//setup array for map function
		let loop = new Array(10).fill(1);
		const categoryData = loop.map((none) => {
			return generateRandomCategoryData();
		});

		const seededCategories = await Category.insertMany(categoryData);

		//retrieve category ids from seeded categories
		const categoryIDs = seededCategories.map((category) => category._id);

		//generate 50 products
		loop = new Array(50).fill(0);
		const productData = loop.map((none) => {
			return generateRandomProductData(categoryIDs);
		});

		//no need to get ID
		await Product.insertMany(productData);

		//generate 5 users
		loop = new Array(5).fill(0);
		const userData = loop.map((none) => {
			return generateRandomUserData();
		});

		//insert to database and store as variable to collect ids
		const seededUsers = await User.insertMany(userData);
		const userIds = seededUsers.map((user) => user._id);

		//generate 5 notifications per user
		const notifPerUser = 5;
		loop = new Array(notifPerUser * userIds.length).fill(0);
		const notificationData = loop.map((number, index) => {
			return generateRandomNotificationData(userIds[notifPerUser % 5]);
		});

		//no need to get ids
		await Notification.insertMany(notificationData);

		console.log("Database seeded and populated.");
	} catch (error) {
		console.error("Error seeding and populating database:", error);
	}

	console.log("Finished");
}

export default seedAndPopulate();
