import { Router } from "express";
import { getAnimalsByOwnerId } from "../controller/animalController";
import { getAll } from "../controller/ownerController";

const router = Router();

router.get("/", getAll);
router.get("/:id/animals", getAnimalsByOwnerId);

export default router;
