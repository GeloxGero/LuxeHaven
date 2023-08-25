import express from "express";
const router = express.Router();
import {
	addNewUser,
	updateUser,
	getAllUsers,
	deleteUser,
} from "../controllers/UserController.js";

router.get("/", getAllUsers);
router.put("/", updateUser);
router.post("/", addNewUser);
router.delete("/", deleteUser);

export default router;
