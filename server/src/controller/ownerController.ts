import type { Request, Response } from "express";
import { browseAll } from "../model/ownerModel";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
	try {
		const owners = await browseAll();

		res.status(200).json(owners);
	} catch (error) {
		console.error("Erreur dans getAll owners:", error);
		res.status(500).json({
			success: false,
			message: "Erreur serveur lors de la récupération des propriétaires.",
		});
	}
};
