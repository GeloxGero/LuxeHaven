import { Outlet } from "react-router-dom";
import styled from "styled-components";

const MainContainer = styled.div`
	height: 100vh;
	width: 100vw;

	overflow-x: hidden;
`;

const App = () => {
	return (
		<MainContainer>
			<Outlet />
		</MainContainer>
	);
};

export default App;
