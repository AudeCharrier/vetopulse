import { Router } from "express";

import { getAll } from "../controller/ownerController";

const router = Router();

router.get("/", getAll);

export default router;
