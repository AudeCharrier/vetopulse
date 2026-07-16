import "dotenv/config";
import { Router } from "express";

import app from "./app";
import userRouter from "./router/userRouter";

const port = process.env.APP_PORT || 3310;
console.log("CLIENT_URL:", process.env.CLIENT_URL);
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});

const router = Router();

router.use("/users", userRouter);
