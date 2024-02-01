import styled from "styled-components";
import images from "./images";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../slices/productSlice";
import { useGetCategoriesQuery } from "../slices/categorySlice";

const PublicContainer = styled.div`
	min-height: 100vh;
	width: 100vw;
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

const CategoryBar = styled.div`
	height: 55px;
	width: 100%;

	background: #252134;

	color: #9e9fa5;

	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
`;

const Highlight = styled.div`
	height: 900px;

	width: 100%;

	margin-bottom: 80px;
	display: flex;

	img {
		width: 53vw;

		object-fit: cover;
		object-position: center;
	}

	.aux {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.aux img:nth-child(1) {
		height: 500px;
		width: 47vw;
	}

	.aux img:nth-child(2) {
		height: 400px;
		width: 47vw;
	}
`;

const PopularContainer = styled.div`
	display: flex;
	gap: 2vmin;
	height: 400px;
	width: 100%;

	margin-bottom: 500px;

	wrap-content: wrap;
`;

const ProductContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2vmin;
	min-height: 400px;
	width: 100%;

	margin-bottom: 500px;

	flex-wrap: wrap;
`;

const ProductCard = styled.div`
	position: relative;
	display: flex;
	align-content: top;
	width: 200px;
	height: 300px;
	padding: 20px;

	flex-direction: column;

	background 20px;


	img {
		position: absolute;
		z-index: -1;
		top: 0;
		height: 300px;
		width: 200px;
		object-fit: cover;
		object-position: top;
	}
`;

const PublicDash = () => {
	const userData = useSelector((state) => state.auth);

	const navigate = useNavigate();

	useEffect(() => {
		if (userData.userInfo) navigate("/customer");
	}, [userData, navigate]);

	const { data: products, isLoading: productsLoading } = useGetProductsQuery();
	const { data: categories, isLoading: categoriesLoading } =
		useGetCategoriesQuery();

	const login = () => {
		navigate("/login");
	};

	const [category, setCategory] = useState(0);

	var processedProducts;

	if (!productsLoading && !categoriesLoading) {
		processedProducts =
			category == 0
				? products
				: products.filter((product) => product.category[0] == category);
	}

	console.log(processedProducts);

	const categoryOnClick = (categoryObj) => {
		setCategory(categoryObj._id);
	};

	return (
		<PublicContainer>
			<Navbar>
				<div className="logo">
					<img src="logo.png" alt="" />
					<h1>Luxe Haven</h1>
				</div>

				<div className="action">
					<input type="text" placeholder="Search" />
					<button onClick={login}>Login</button>
					<button>Cart</button>
				</div>
			</Navbar>
			{categoriesLoading ? (
				<CategoryBar>
					<h2>Loading...</h2>
				</CategoryBar>
			) : (
				<CategoryBar>
					{categories.map((categoryObj) => {
						return (
							<h1 onClick={() => categoryOnClick(categoryObj)}>
								{categoryObj.name}
							</h1>
						);
					})}
				</CategoryBar>
			)}

			<Highlight>
				<img src="ad-big.png" alt="big ad" />
				<div className="aux">
					<img src="ad-med.png" alt="" />
					<img src="ad-small.png" alt="" />
				</div>
			</Highlight>
			<PopularContainer>
				{productsLoading ? (
					<div>Loading...</div>
				) : (
					<ProductContent>
						{processedProducts.map((product) => {
							return (
								<ProductCard>
									<h1>{product.name}</h1>
									<h3>{product.price}$</h3>
									<h3>Rating: {product.rating}</h3>
									<h3>Sales: {product.sales}</h3>
									<div>
										<button>Buy Now</button>
										<button>Add to Cart</button>
									</div>
									<img src={images[Math.floor(Math.random() * 22)]} alt="" />
								</ProductCard>
							);
						})}
					</ProductContent>
				)}
			</PopularContainer>
		</PublicContainer>
	);
};

export default PublicDash;
