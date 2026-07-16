import { useState, useEffect } from "react";
import ProprioCard from "./ProprioCard"; // Si tu utilises notre composant autonome !
import { apiFetch } from "../hooks/apiFetch";

function AdminPage() {
	const [proprios, setProprios] = useState([]);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState<string>("");
	const [isError, setIsError] = useState<boolean>(false);

	useEffect(() => {
		const fetchProprios = async () => {
			try {
				const response = await apiFetch("/api/users", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (response.status === 404) {
					setMessage(
						"Impossible de charger les propriétaires : le service est introuvable.",
					);
					setIsError(true);
					setLoading(false);
					return;
				}

				if (response.status === 200) {
					const data = await response.json();
					setProprios(data);
					setIsError(false);
					setLoading(false);
					return;
				}
				setMessage(
					"Impossible de contacter le serveur pour récupérer les données.",
				);
				setIsError(true);
				setLoading(false);
			} catch (error) {
				console.error("Erreur fetch:", error);
				setMessage("Une erreur inattendue est survenue lors du chargement.");
				setIsError(true);
				setLoading(false);
			}
		};

		fetchProprios();
	}, []);

	if (loading) return <p>Chargement des données administrateur...</p>;

	return (
		<>
			<h2>Propriétaires</h2>

			{proprios.length === 0 ? (
				<div
					style={{
						padding: "20px",
						textAlign: "center",
						border: "1px dashed #ccc",
						borderRadius: "8px",
						margin: "15px 0",
					}}
				>
					<p>Aucun propriétaire n'a été trouvé.</p>
				</div>
			) : (
				proprios.map((proprio) => (
					<section
						key={proprio.id}
						style={{
							border: "2px solid #333",
							padding: "15px",
							margin: "15px 0",
							borderRadius: "8px",
						}}
					>
						{/* Section Informations de contact */}
						<div>
							<div>
								<p>Nom : {proprio.nom}</p>
								<button type="button">Modifier</button>
							</div>
							<div>
								<p>Prénom : {proprio.prenom}</p>
								<button type="button">Modifier</button>
							</div>
						</div>
						<div>
							<div>
								<p>Email : {proprio.email}</p>
								<button type="button">Modifier</button>
							</div>
							<div>
								<p>Tel : {proprio.telephone}</p>
								<button type="button">Modifier</button>
							</div>
						</div>

						{/* Section Adresse */}
						<div
							style={{
								marginTop: "10px",
								borderTop: "1px solid #ccc",
								paddingTop: "10px",
							}}
						>
							<p>Adresse : {proprio.adresse}</p>
							<p>Code Postal : {proprio.zipcode}</p>
							<p>Ville : {proprio.city}</p>
							<button type="button">Voir les animaux</button>
						</div>
					</section>
				))
			)}

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

export default AdminPage;
