import { useState, useEffect } from "react";
/* import ProprioCard from "./ProprioCard";
 */ import { apiFetch } from "../hooks/apiFetch";

interface Owner {
	id: number;
	lastname: string;
	firstname: string;
	email: string;
	telephone: string;
	adress: string;
	zipcode: string;
	city: string;
}

function AdminPage() {
	const [owners, setOwners] = useState<Owner[]>([]);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState<string>("");
	const [isError, setIsError] = useState<boolean>(false);

	useEffect(() => {
		const fetchOwners = async () => {
			try {
				const response = await apiFetch("/api/owners", {
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
					setOwners(data);
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

		fetchOwners();
	}, []);

	if (loading) return <p>Chargement des données administrateur...</p>;

	return (
		<>
			<h2>Propriétaires</h2>

			{owners.length === 0 ? (
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
				owners.map((owner) => (
					<section
						key={owner.id}
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
								<p>Nom : {owner.lastname}</p>
								<button type="button">Modifier</button>
							</div>
							<div>
								<p>Prénom : {owner.firstname}</p>
								<button type="button">Modifier</button>
							</div>
						</div>
						<div>
							<div>
								<p>Email : {owner.email}</p>
								<button type="button">Modifier</button>
							</div>
							<div>
								<p>Tel : {owner.telephone}</p>
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
							<p>Adresse : {owner.adress}</p>
							<p>Code Postal : {owner.zipcode}</p>
							<p>Ville : {owner.city}</p>
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
