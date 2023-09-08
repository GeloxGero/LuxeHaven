import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";

import connectDB from "../backend/config/db.js";
import seedDB from "./faker/Faker.js";

import CartRoutes from "./routes/CartRoutes.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import NotificationRoutes from "./routes/NotificationRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import ReceiptRoutes from "./routes/ReceiptRoutes.js";
import ReviewRoutes from "./routes/ReviewRoutes.js";
import TicketRoutes from "./routes/TicketRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();
seedDB();

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/cart", CartRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/notification", NotificationRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/receipt", ReceiptRoutes);
app.use("/api/review", ReviewRoutes);
app.use("/api/ticket", TicketRoutes);
app.use("/api/user", UserRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Started on Port${PORT}`));
