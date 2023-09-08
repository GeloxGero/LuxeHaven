import styled from "styled-components";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCredentials } from "../../slices/authSlice";
import { useGetProductsQuery } from "../../slices/productSlice";

import { useGetCategoriesQuery } from "../../slices/categorySlice";
import ProductCard from "../../components/ProductCard";

const MainContainer = styled.div`
	width: 100vw;
	height: 100vh;

	display: flex;
	justify-content: start;
	align-items: center;

	flex-direction: column;
`;

const Navbar = styled.div`
	height: 80px;

	width: 100%;

	display: flex;
	align-items: center;
	justify-content: space-between;

	background-color: #fff;

	.logo {
		img {
			height: 60px;
			padding-left: 20px;
			padding-right: 30px;
		}

		display: flex;
		align-items: center;
	}

	.action {
		margin-right: 100px;

		input {
			height: 40px;

			border: none;
		}

		button {
			border: none;
			margin-left: 50px;
		}
	}
`;

const StoreContainer = styled.div`
	margin-top: 50px;
	padding-bottom: 150px;
	min-height: 1500px;
	min-width: 70vw;
	max-width: 85vw;

	background: #e2e2e2;
`;

const CustomerDash = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [logout] = useLogoutMutation();

	const {
		data: items,
		isLoading: itemsLoading,
		isSuccess: itemsSuccess,
	} = useGetProductsQuery();

	const {
		data: categories,
		isLoading: categoriesLoading,
		isSuccess: categoriesSuccess,
	} = useGetProductsQuery();

	let content;

	if (itemsLoading || categoriesLoading) content = <h1>Loading...</h1>;
	else {
		const newItems = items.map((item) => ({
			...item,
			category: categories.find((category) => {
				return item.category === category._id;
			}),
		}));

		console.log(items);

		content = (
			<MainContainer>
				<Navbar>
					<div className="logo">
						<img src="logo.png" alt="" />
						<h1>Luxe Haven</h1>
					</div>

					<div className="action">
						<input type="text" placeholder="Search" />
						<button
							onClick={async () => {
								await logout().unwrap();
								dispatch(clearCredentials());

								navigate("/");
							}}
						>
							Logout
						</button>
						<button>Cart</button>
					</div>
				</Navbar>
				<StoreContainer>
					<ProductCard data={newItems} />
				</StoreContainer>
			</MainContainer>
		);
	}
	return content;
};

export default CustomerDash;
