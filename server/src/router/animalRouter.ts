import { Router } from "express";
import {
	deleteOneAnimal,
	updateOneAnimal,
} from "../controller/animalController";

const router = Router();

router.patch("/:id", updateOneAnimal);
router.delete("/:id", deleteOneAnimal);

export default router;
