import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import "./index.css";
import store from "./store.js";
import { Provider } from "react-redux";

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

import Login from "./features/Login.jsx";
import PublicDash from "./features/PublicDash.jsx";
import CustomerDash from "./features/customer/CustomerDash.jsx";
import SellerDash from "./features/seller/SellerDash.jsx";
import AdminDash from "./features/admin/AdminDash.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index element={<PublicDash />} />
			<Route path="customer" element={<CustomerDash />} />
			<Route path="seller" element={<SellerDash />} />
			<Route path="admin" element={<AdminDash />} />
			<Route path="login" element={<Login />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</Provider>
);
