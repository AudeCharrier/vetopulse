import type { Request, Response } from "express";
import { hashPassword } from "../helper/argonHelper";
import { addOne } from "../model/userModel";

const createOne = async (req: Request, res: Response): Promise<void> => {
	try {
		if (req.validationErrors) {
			res.status(400).json({
				success: false,
				errors: req.validationErrors,
			});
			return;
		}
		const {
			plain_password,
			confirm_password,
			plain_pincode,
			confirm_pincode,
			...restOfBody
		} = req.body;

		const hashedPassword = await hashPassword(plain_password);
		const hashedPinCode = await hashPassword(plain_pincode);
		const medpeople = await addOne({
			...restOfBody,
			password: hashedPassword,
			pin: hashedPinCode,
		});

		res.status(201).json(medpeople);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

export { createOne };
