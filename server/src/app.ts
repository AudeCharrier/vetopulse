import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
/* import cookieParser from "cookie-parser";
 */
import router from "./router";

const app = express();

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	}),
);

app.use(express.json());
app.use(express.urlencoded());
/* app.use(cookieParser()); */

// Route de test
app.get("/", (_req: Request, res: Response) => {
	res.status(200).json({ message: "API VetoPulse" });
});

app.use("/api", router);

// 404 : aucune route ne correspond
app.use((_req: Request, res: Response) => {
	res.status(404).json({ message: "Not Found" });
});

export default app;
