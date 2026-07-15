import { useState } from "react";
import { apiFetch } from "../hooks/apiFetch";

import "./Auth.css";
import type { RegisterUserForm } from "../types/types";

function SigninPage() {
	const [message, setMessage] = useState<string>("");
	const [isError, setIsError] = useState<boolean>(false);

	async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData) as unknown as RegisterUserForm;

		try {
			const response = await apiFetch("/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.status === 400) {
				const errorData = await response.json();
				const messageCombine = errorData.errors.join("\n");
				setMessage(messageCombine);
				setIsError(true);
				return;
			}

			if (response.status === 404) {
				setMessage("Le service d'inscription est momentanément indisponible.");
				setIsError(true);
				return;
			}

			if (response.status === 201) {
				setMessage("Votre compte a bien été créé !");
				setIsError(false);
				e.currentTarget.reset();
				return;
			}

			// si le back renvoie un code inattendu (ex: 500)
			setMessage("Une erreur inattendue est survenue.");
			setIsError(true);
		} catch {
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
				<label htmlFor="employee_status">Statut médical</label>
				<select id="employee_status" name="employee_status" required>
					<option value="assistant">Assistant(e)</option>
					<option value="veterinarian">Vetérinaire</option>
				</select>

				<label htmlFor="last_name">Nom</label>
				<input type="text" id="last_name" name="last_name" required></input>

				<label htmlFor="first_name">Prénom</label>
				<input type="text" id="first_name" name="first_name" required></input>

				<label htmlFor="email">Email</label>
				<input type="text" id="email" name="email" required></input>

				<label htmlFor="plain_password">Mot de passe</label>
				<input
					type="password"
					id="password"
					name="plain_password"
					required
				></input>

				<label htmlFor="confirm_password">Confirmation du mot de passe</label>
				<input
					type="password"
					id="confirm_password"
					name="confirm_password"
					required
				></input>

				<label htmlFor="plain_pincode">
					Choisissez un code Pin à 4 chiffres
				</label>
				<input
					type="text"
					id="plain_pincode"
					name="plain_pincode"
					required
				></input>

				<label htmlFor="confirm_pincode">Confirmation du code Pin</label>
				<input
					type="text"
					inputMode="numeric"
					pattern="[0-9]{4}"
					id="confirm_pincode"
					name="confirm_pincode"
					required
				/>

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
