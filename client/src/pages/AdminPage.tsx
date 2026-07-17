import { useState, useEffect } from "react";
/* import ProprioCard from "./ProprioCard"; */
import { apiFetch } from "../hooks/apiFetch";

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

interface Animal {
	id: number;
	pet_name: string;
	species_name: string;
	race_name: string;
	birth_date: string;
	gender: string;
	is_neutered: boolean;
	insurance: string;
	microchip_number: string;
	tatoo_number: string;
	observations: string;
}

function AdminPage() {
	const [owners, setOwners] = useState<Owner[]>([]);
	const [animals, setAnimals] = useState<Animal[]>([]);
	const [selectedOwnerId, setSelectedOwnerId] = useState<number | null>(null);
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

	const fetchAnimals = async (ownerId: number) => {
		try {
			const response = await apiFetch(`/api/owners/${ownerId}/animals`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.status === 404) {
				setMessage(
					"Impossible de charger les animaux : le service est introuvable.",
				);
				setIsError(true);
				return;
			}

			if (response.status === 200) {
				const data = await response.json();
				setAnimals(data);
				setSelectedOwnerId(ownerId); // On retient quel propriétaire a ses animaux affichés
				setIsError(false);
				return;
			}
			setMessage(
				"Impossible de contacter le serveur pour récupérer les données.",
			);
			setIsError(true);
		} catch (error) {
			console.error("Erreur fetch:", error);
			setMessage("Une erreur inattendue est survenue lors du chargement.");
			setIsError(true);
		}
	};

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
					<span key={owner.id}>
						<section
							style={{
								border: "2px solid #333",
								padding: "15px",
								margin: "15px 0 0 0",
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
								<button type="button" onClick={() => fetchAnimals(owner.id)}>
									Voir les animaux
								</button>
							</div>
						</section>

						{/* Section d'affichage des animaux - Seulement pour le propriétaire sélectionné */}
						{animals && selectedOwnerId === owner.id && (
							<section
								style={{
									marginTop: "5px",
									marginBottom: "20px",
									padding: "15px",
									backgroundColor: "#f9f9f9",
									border: "1px solid #ddd",
									borderRadius: "0 0 8px 8px",
								}}
							>
								<h3>
									Animaux de {owner.firstname} {owner.lastname}
								</h3>

								{animals.length === 0 ? (
									<p>Cet utilisateur n'a pas d'animal enregistré.</p>
								) : (
									animals.map((animal, index) => (
										<div
											key={animal.id}
											style={{
												padding: "10px 0",
												borderBottom:
													index < (animals?.length ?? 0) - 1
														? "1px solid #eee"
														: "none",
											}}
										>
											<p>
												<strong>Nom :</strong> {animal.pet_name}
											</p>
											<p>
												<strong>Date de naissance :</strong>{" "}
												{new Date(animal.birth_date).toLocaleDateString()}
											</p>
											<p>
												<strong>Espèce :</strong> {animal.species_name}
											</p>
											<p>
												<strong>Race :</strong> {animal.race_name}
											</p>
											<p>
												<strong>Genre :</strong> {animal.gender}
											</p>
											<p>
												<strong>Stérilisé :</strong>{" "}
												{animal.is_neutered ? "Oui" : "Non"}
											</p>
											{animal.insurance && (
												<p>
													<strong>Assurance :</strong> {animal.insurance}
												</p>
											)}
											{animal.microchip_number && (
												<p>
													<strong>Numéro de puce :</strong>{" "}
													{animal.microchip_number}
												</p>
											)}
											{animal.tatoo_number && (
												<p>
													<strong>Tatouage :</strong> {animal.tatoo_number}
												</p>
											)}
											{animal.observations && (
												<p style={{ fontStyle: "italic", color: "#555" }}>
													<strong>Observations :</strong> {animal.observations}
												</p>
											)}
										</div>
									))
								)}
							</section>
						)}
					</span>
				))
			)}

			{message && (
				<span
					className={`auth-form-message ${isError ? "auth-form-message-error" : "auth-form-message-success"}`}
					style={{ display: "block", marginTop: "15px" }}
				>
					{message}
				</span>
			)}
		</>
	);
}

export default AdminPage;
