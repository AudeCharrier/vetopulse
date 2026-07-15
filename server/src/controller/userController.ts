import type { Request, Response } from "express";

const createOne = async (_req: Request, res: Response): Promise<void> => {
	try {
		//appeler addOne du model (repository)
		res.status(201).json();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

export { createOne };
