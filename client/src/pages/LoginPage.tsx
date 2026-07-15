import { Link } from "react-router";
import "./Auth.css";
function LoginPage() {
	return (
		<>
			<h1>Se connecter</h1>

			<p>
				Pas encore membre ? <Link to="/signin">S'inscrire</Link>
			</p>
		</>
	);
}

export default LoginPage;
