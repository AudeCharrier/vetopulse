import { useState } from "react";
import { apiFetch } from "../hooks/apiFetch";

import "./Auth.css";

function SigninPage() {
	const [message, setMessage] = useState<string>("");
	const [isError, setIsError] = useState<boolean>(false);

	async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData);

		try {
			const response = await apiFetch("/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.status === 401) {
				const errorData = await response.json();
				setMessage(errorData.message);
				setIsError(true);
				return;
			}

			if (response.status === 400) {
				const errorData = await response.json();
				const messageCombine = errorData.errors.join("\n");
				setMessage(messageCombine);
				setIsError(true);
				return;
			}
			// simplifier dire de relire les champs (flou sécurité)

			if (response.status === 404) {
				setMessage("Impossible de ??");
				setIsError(true);
				return;
			}

			if (response.status === 201) {
				setMessage("Votre compte a bien été créé !");
				setIsError(false);
				/* 	form.reset(); */
				return;
			}

			// si le back renvoie un code inattendu (ex: 500)
			setMessage("Une erreur inattendue est survenue.");
			setIsError(true);
		} catch (_err) {
			setMessage("Impossible de contacter le serveur.");
			setIsError(true);
		}
	}

	return (
		<>
			<h1>S'inscrire</h1>
			<form
				className="auth-form"
				action="#"
				method="post"
				onSubmit={handleSubmit}
				noValidate
			>
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
			{message && (
				<span
					className={`auth-form-message ${isError ? "auth-form-message-error" : "auth-form-message-success"}`}
				>
					{message}
				</span>
			)}
		</>
	);
}
export default SigninPage;
