import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			type: user.type,
		});
	} else {
		res.status(400);
		throw new Error("Invalid email or password");
	}
});

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const type = "Customer";
	const status = "Active";
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	const user = await User.create({
		name,
		email,
		password,
		type,
		status,
	});

	if (user) {
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			type: type,
			status: status,
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

const logoutUser = asyncHandler(async (req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});

	res.status(200).json({ message: "User logged out" });
});

const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find().lean();

	// If no users
	if (!users?.length) {
		return res.status(400).json({ message: "No Users found" });
	}

	res.json(users);
});

const addNewUser = asyncHandler(async (req, res) => {
	const { name, password, email, type, status } = req.body;

	console.log(req.body);

	// Confirm data
	if (!name || !password || !email || !type || !status) {
		return res.status(400).json({
			message: { name, password, email, type, status },
		});
	}

	// Create and store the new user
	const newUser = await User.create({
		name,
		password,
		email,
		type,
		status,
	});

	if (newUser) {
		// Created User
		return res.status(201).json({ message: "New User Created" });
	} else {
		return res.status(400).json({ message: "Invalid data received" });
	}
});

const updateUser = asyncHandler(async (req, res) => {
	const { id, name, password, email, type, status, favorites } = req.body;

	//ensure favorites is never undefined
	if (!favorites) favorites = [];

	// Confirm data
	if (!id || !name || !password || !email || !type || !status || !favorites) {
		return res.status(400).json({ message: "All fields are required" });
	}

	const updatedUser = await User.findOneAndUpdate(
		{ _id: id },
		{ name, password, email, type, status, favorites }
	);

	if (!updatedUser) res.json({ message: "Invalid values" });

	res.json({
		message: `Updated User ${updatedUser.name}`,
	});
});

const deleteUser = asyncHandler(async (req, res) => {
	//delete all users branching out from this user

	const { id } = req.body;

	const user = await User.findById(id).exec();
	if (!user) {
		res.status(401).json({ message: "User Not Found" });
	}

	const result = await User.deleteOne({ _id: id });
	res.status(200).json({ message: "User Deleted" });
});

export {
	getAllUsers,
	addNewUser,
	updateUser,
	deleteUser,
	authUser,
	registerUser,
	logoutUser,
};
