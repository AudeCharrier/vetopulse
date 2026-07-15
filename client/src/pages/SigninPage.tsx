import "./Auth.css";

function SigninPage() {
	return (
		<>
			<h1>S'inscrire</h1>
			<form className="auth-form">
				<label htmlFor="medical-status">Statut médical</label>
				<select id="medical-status" name="medical-status" required>
					<option value="assistant">Assistant(e)</option>
					<option value="veterinarian">Vetérinaire</option>
				</select>

				<label htmlFor="lastname">Nom</label>
				<input type="text" id="lastname" name="lastname" required></input>

				<label htmlFor="firstname">Prénom</label>
				<input type="text" id="firstname" name="firstname" required></input>

				<label htmlFor="email">Email</label>
				<input type="text" id="email" name="email" required></input>

				<label htmlFor="password">Mot de passe</label>
				<input type="password" id="password" name="password" required></input>

				<label htmlFor="confirm-password">Confirmation du mot de passe</label>
				<input
					type="password"
					id="confirm-password"
					name="confirm-password"
					required
				></input>

				<label htmlFor="pin">Code Pin</label>
				<input type="number" id="pin" name="pin" required></input>

				<label htmlFor="confirm-pin">Confirmation du code Pin</label>
				<input
					type="number"
					id="confirm-pin"
					name="confirm-pin"
					required
				></input>

				<button type="submit">Valider</button>
				<button type="button">Annuler</button>
			</form>
		</>
	);
}
export default SigninPage;
