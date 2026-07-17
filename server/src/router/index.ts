import { Router } from "express";

import userRouter from "./userRouter";
import ownerRouter from "./ownerRouter";
import animalRouter from "./animalRouter";

const router = Router();

router.use("/users", userRouter);
router.use("/owners", ownerRouter);
router.use("/animals", animalRouter);

export default router;
