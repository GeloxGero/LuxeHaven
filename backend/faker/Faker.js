import seedProduct from "./FakerProduct.js";
import seedCategory from "./FakerCategory.js";

const seedDB = async () => {
	await seedCategory();
	await seedProduct();
};

export default seedDB;
