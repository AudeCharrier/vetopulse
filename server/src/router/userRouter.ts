import { Router } from "express";

import { createOne } from "../controller/userController";

const router = Router();

// POST http://localhost:3310/api/users
router.post("/", createOne);

export default router;
