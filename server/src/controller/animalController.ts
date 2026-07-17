import type { RequestHandler } from "express";
import {
	browseAnimalsByOwnerId,
	deleteAnimalById,
	editAnimalById,
} from "../model/animalModel";

export const getAnimalsByOwnerId: RequestHandler = async (req, res) => {
	try {
		const ownerId = Number(req.params.id);

		if (Number.isNaN(ownerId)) {
			res.status(400).json({ message: "ID du propriétaire invalide." });
			return;
		}

		const animalsList = await browseAnimalsByOwnerId(ownerId);

		res.status(200).json(animalsList);
	} catch (error) {
		console.error("Erreur:", error);
		res.status(500).json({
			success: false,
			message: "Erreur serveur lors de la récupération des animaux.",
		});
	}
};

export const updateOneAnimal: RequestHandler = async (req, res) => {
	try {
		const animalId = Number(req.params.id);

		if (Number.isNaN(animalId)) {
			res.status(400).json({ message: "ID de l'animal invalide." });
			return;
		}
		const updateData = req.body;

		if (!updateData || Object.keys(updateData).length === 0) {
			res
				.status(400)
				.json({ message: "Aucune donnée fournie pour la modification." });
			return;
		}

		const updatedAnimal = await editAnimalById(animalId, updateData);

		if (!updatedAnimal) {
			res.status(404).json({ message: "Animal non trouvé." });
			return;
		}

		res.status(200).json(updatedAnimal);
	} catch (error) {
		console.error("Erreur:", error);
		res.status(500).json({
			success: false,
			message: "Erreur serveur lors de la modification de l'animal.", // J'ai corrigé le message qui parlait de "récupération" ;)
		});
	}
};

export const deleteOneAnimal: RequestHandler = async (req, res) => {
	try {
		const animalId = Number(req.params.id);

		if (Number.isNaN(animalId)) {
			res.status(400).json({ message: "ID de l'animal invalide." });
			return;
		}

		const isDeleted = await deleteAnimalById(animalId);

		if (!isDeleted) {
			res.status(404).json({ message: "Animal non trouvé." });
			return;
		}

		res.status(200).json({
			message:
				"L'animal et tout son historique médical ont été supprimés avec succès.",
		});
	} catch (error) {
		console.error("Erreur lors de la suppression :", error);
		res.status(500).json({
			success: false,
			message: "Erreur serveur lors de la suppression de l'animal.",
		});
	}
};
