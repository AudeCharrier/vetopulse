import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage.tsx";
import "./index.css";
import App from "./App.tsx";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <LoginPage />,
			},
			{
				path: "/signin",
				element: <SigninPage />,
			},
		],
	},
]);

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
