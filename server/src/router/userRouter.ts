import { Router } from "express";

import { createOne } from "../controller/userController";
import userValidation from "../middleware/userMiddleware";

const router = Router();

// POST http://localhost:3310/api/users
router.post("/", userValidation.validateAddUser, createOne);

export default router;
