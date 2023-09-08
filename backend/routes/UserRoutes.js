import express from "express";
const router = express.Router();
import {
	addNewUser,
	updateUser,
	getAllUsers,
	deleteUser,
	registerUser,
	authUser,
	logoutUser,
} from "../controllers/UserController.js";

router.get("/", getAllUsers);
router.put("/", updateUser);
router.post("/", addNewUser);
router.delete("/", deleteUser);

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);

export default router;
