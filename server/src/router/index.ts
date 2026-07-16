import { Router } from "express";

import userRouter from "./userRouter";
import ownerRouter from "./ownerRouter";

const router = Router();

router.use("/users", userRouter);
router.use("/owners", ownerRouter);

export default router;
