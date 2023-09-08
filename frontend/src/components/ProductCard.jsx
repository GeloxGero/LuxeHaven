import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHeart,
	faAngleRight,
	faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import images from "../assets/image-links";

const ProductContainer = styled.div`
	max-width: 80vw;
	min-height: 500px;
	border-radius: 10px;

	display: flex;
	justify-content: center;
	padding: 20px;

	flex-wrap: wrap;
	background-color: #31344b;

	margin-bottom: 50px;
`;

const ProductCardContainer = styled.div`
	height: 350px;
	width: 250px;
	margin: 30px;
	border-radius: 10px;

	position: relative;

	:hover {
		cursor: pointer;
	}

	img {
		top: 0;
		height: 350px;
		width: 280px;
		object-fit: cover;
		object-position: top;
	}

	h1 {
		position: absolute;
		font-size: 1em;
		z-index: 1;
		top: 1;
		left: 1;

		padding: 10px 0 0 10px;
		color: #000;
	}

	p {
		position: absolute;
		font-size: 1em;
		z-index: 1;
		top: 40;
		left: 10;

		padding: 30px 0 0 10px;
		color: #000;
	}

	.icon {
		position: absolute;
		top: 0;
		right: 0;
		height: 18px;

		padding: 10px 10px 0 0;
	}

	.icon:hover {
		cursor: pointer;
		color: red;
	}

	.favorite {
	}

	overflow: hidden;
`;

const PageNavigation = styled.div`
	display: flex;
	align-self: end;
	justify-content: start;

	gap: 5px;
	width: 100%;

	p {
		padding-left: 20px;
		font-size: 1.4em;
		color: #000;
	}

	p:hover {
		cursor: pointer;
	}
`;

const ProductCard = ({ data }) => {
	const [popularPage, setPopularPage] = useState(0);

	const spliceArrayIntoChunks = function (array, chunkSize) {
		const result = [];
		for (let i = 0; i < array.length; i += chunkSize) {
			result.push(array.slice(i, i + chunkSize));
		}
		return result;
	};

	const pagedItems = spliceArrayIntoChunks(data, 10);

	const handlePopularPage = (input) => {
		if (input === 1) {
			if (popularPage + 1 === pagedItems.length) return;
			setPopularPage(popularPage + 1);
		} else if (input === -1) {
			if (popularPage === 0) return;
			setPopularPage(popularPage - 1);
		}
	};

	return (
		<ProductContainer>
			{pagedItems[popularPage].map((item, index) => {
				return (
					<ProductCardContainer key={index}>
						<h1>{item.name}</h1>
						<p>₱ {item.price}</p>
						<FontAwesomeIcon icon={faHeart} className="icon" />
						<img src={images[Math.floor(Math.random() * 10)]} alt="image" />
					</ProductCardContainer>
				);
			})}

			<PageNavigation>
				<p onClick={() => handlePopularPage(-1)}>
					<FontAwesomeIcon icon={faAngleLeft} />
				</p>
				<p onClick={() => handlePopularPage(1)}>
					<FontAwesomeIcon icon={faAngleRight} />
				</p>
			</PageNavigation>
		</ProductContainer>
	);
};

export default ProductCard;
