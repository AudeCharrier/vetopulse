import { Router } from "express";

import { getAll } from "../controller/ownerController";

const router = Router();

router.get("/", getAll);
router.get("/:id/animals", getAnimalsByOwner);

export default router;
