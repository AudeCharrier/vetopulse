import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage.tsx";
import "./index.css";
import App from "./App.tsx";
import AdminPage from "./pages/AdminPage.tsx";

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
			{
				path: "/admin",
				element: <AdminPage />,
			},
		],
	},
]);

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
