import { useState, useEffect } from "react";
import ProprioCard from "./ProprioCard";
import { apiFetch } from "../../hooks/apiFetch";

function ProprioList() {
	const [proprios, setProprios] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// 1. Récupération des données (GET sur api/users) au montage du composant
	useEffect(() => {
		apiFetch("http://localhost:3310/api/users")
			.then((res) => {
				if (!res.ok) {
					throw new Error("Impossible de récupérer les utilisateurs");
				}
				return res.json();
			})
			.then((data) => {
				setProprios(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Erreur de fetch:", err);
				setError(err.message);
				setLoading(false);
			});
	}, []);

	/* // 2. Fonction de mise à jour (Appelée quand on valide une modif dans ProprioCard)
	const handleUpdateProprio = async (updatedProprio) => {
		// Mise à jour optimiste (on met à jour le state tout de suite pour éviter d'attendre l'API)
		const originalProprios = [...proprios];
		setProprios((prev) =>
			prev.map((p) => (p.id === updatedProprio.id ? updatedProprio : p)),
		);

		try {
			// On envoie les données modifiées au serveur en BDD
			const response = await fetch(`/api/users/${updatedProprio.id}`, {
				method: "PUT", // ou PATCH selon ton API back-end
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedProprio),
			});

			if (!response.ok) {
				throw new Error("La sauvegarde côté serveur a échoué");
			}
		} catch (err) {
			console.error("Erreur de sauvegarde:", err);
			// En cas d'échec de la BDD, on réinitialise l'état précédent (Rollback)
			setProprios(originalProprios);
			alert(
				"Une erreur est survenue lors de l'enregistrement. Modification annulée.",
			);
		}
	};
 */
	if (loading) return <p>Chargement des propriétaires en cours...</p>;
	if (error) return <p style={{ color: "red" }}>Erreur : {error}</p>;

	return (
		<div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
			<h2>Liste des Propriétaires</h2>

			{proprios.length === 0 ? (
				<p>Aucun propriétaire trouvé.</p>
			) : (
				proprios.map((proprio) => (
					<ProprioCard
						key={proprio.id}
						proprio={proprio}
						/* 	onUpdateProprio={handleUpdateProprio} */
					/>
				))
			)}
		</div>
	);
}

export default ProprioList;
