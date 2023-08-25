import styled from "styled-components";

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
	height: 400px;
	width: 100%;
	background: blue;

	margin-bottom: 500px;
`;

const PublicDash = () => {
	return (
		<PublicContainer>
			<Navbar>
				<div className="logo">
					<img src="logo.png" alt="" />
					<h1>Luxe Haven</h1>
				</div>

				<div className="action">
					<input type="text" placeholder="Search" />
					<button>Login</button>
					<button>Cart</button>
				</div>
			</Navbar>
			<CategoryBar>
				<h2>NEW</h2>
				<h2>APPAREL</h2>
				<h2>FURNITURE</h2>
				<h2>FOOD</h2>
				<h2>SALE</h2>
			</CategoryBar>
			<Highlight>
				<img src="ad-big.png" alt="big ad" />
				<div className="aux">
					<img src="ad-med.png" alt="" />
					<img src="ad-small.png" alt="" />
				</div>
			</Highlight>
			<PopularContainer></PopularContainer>
		</PublicContainer>
	);
};

export default PublicDash;
