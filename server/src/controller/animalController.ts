import type { Request, Response } from "express";
import { browseAnimalsByOwnerId } from "../model/animalModel";

export const readAnimalsByOwnerId = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		// req.params.id correspond au ":id" de ta route
		const ownerId = Number(req.params.id);

		if (isNaN(ownerId)) {
			res.status(400).json({ message: "ID du propriétaire invalide." });
			return;
		}

		const animalsList = await browseAnimalsByOwnerId(ownerId);

		res.status(200).json(animalsList);
	} catch (error) {
		console.error("Erreur dans getAnimalsByOwner:", error);
		res.status(500).json({
			success: false,
			message: "Erreur serveur lors de la récupération des animaux.",
		});
	}
};
