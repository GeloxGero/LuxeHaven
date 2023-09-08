import styled from "styled-components";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCredentials } from "../../slices/authSlice";
import { useGetProductsQuery } from "../../slices/productSlice";
import ProductCard from "../../components/ProductCard";

const MainContainer = styled.div`
	width: 100vw;
	height: 100vh;

	display: flex;
	justify-content: start;
	align-items: center;

	flex-direction: column;
`;

const NavContainer = styled.div`
	height: 80px;
	width: 100vw;
	background: #f9f9f9;
`;

const StoreContainer = styled.div`
	height: 1500px;
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

	let content;

	if (itemsLoading) content = <h1>Loading...</h1>;
	else {
		console.log(items);

		content = (
			<MainContainer>
				<NavContainer>
					<button
						onClick={async () => {
							await logout().unwrap();
							dispatch(clearCredentials());

							navigate("/");
						}}
					>
						Logout
					</button>
					CustomerDash
				</NavContainer>
				<StoreContainer></StoreContainer>
			</MainContainer>
		);
	}
	return content;
};

export default CustomerDash;
