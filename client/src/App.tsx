import { Link, Outlet } from "react-router";

import "./App.css";

function App() {
	return (
		<>
			<nav>
				<Link to="/">Login</Link>
			</nav>
			<main>
				<Outlet />
			</main>
		</>
	);
}

export default App;
