import express, { Request, Response } from "express";
import uploadRoutes from "./routes/upload";
import path from "path";
import { configDotenv } from "dotenv";
import cors from "cors";

configDotenv();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use("/api", uploadRoutes);

app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to Sonic CDN!");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
