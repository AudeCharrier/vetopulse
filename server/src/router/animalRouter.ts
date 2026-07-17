import { Router } from "express";
import { editOneAnimal } from "../controller/animalController";

const router = Router();

router.patch("/:id", editOneAnimal);

export default router;
