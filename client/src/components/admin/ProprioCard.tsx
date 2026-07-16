import { useState } from "react";
import EditableField from "./EditableField";

function ProprioCard({ initialProprio }) {
	// On initialise l'état local du composant avec les données reçues du parent
	const [proprio, setProprio] = useState(initialProprio);

	const fieldsConfig = [
		{ key: "nom", label: "Nom" },
		{ key: "email", label: "Email" },
		{ key: "telephone", label: "Téléphone" },
	];

	const handleFieldUpdate = async (fieldName, newValue) => {
		// 1. On prépare le nouvel objet mis à jour
		const updatedProprio = {
			...proprio,
			[fieldName]: newValue,
		};

		// 2. Mise à jour optimiste du state local (l'affichage change tout de suite)
		setProprio(updatedProprio);

		// 3. Le composant gère sa propre sauvegarde en BDD
		try {
			const response = await fetch(`/api/users/${proprio.id}`, {
				method: "PUT", // ou PATCH
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedProprio),
			});

			if (!response.ok) {
				throw new Error("Erreur lors de l'enregistrement en base de données");
			}
		} catch (err) {
			console.error(err);
			// En cas d'échec de la BDD, on fait un rollback à l'ancienne valeur
			setProprio(proprio);
			alert("La mise à jour a échoué. Annulation de la modification.");
		}
	};

	return (
		<div
			style={{
				border: "2px solid #333",
				padding: "15px",
				borderRadius: "8px",
				margin: "15px 0",
			}}
		>
			<h3>Fiche Propriétaire ({proprio.nom})</h3>

			{fieldsConfig.map((field) => (
				<EditableField
					key={field.key}
					label={field.label}
					value={proprio[field.key] || ""}
					onSave={(newVal) => handleFieldUpdate(field.key, newVal)}
				/>
			))}
		</div>
	);
}

export default ProprioCard;
