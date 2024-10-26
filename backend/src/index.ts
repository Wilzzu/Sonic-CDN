import express, { Request, Response } from "express";
import uploadRoutes from "./routes/uploadRoutes";
import fileRoutes from "./routes/fileRoutes";
import storageRoutes from "./routes/storageRoutes";
import { configDotenv } from "dotenv";
import cors from "cors";
import { authenticate } from "./middlewares/authMiddleware";

configDotenv();

const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authenticate);

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/storage", storageRoutes);

app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to Sonic CDN!");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
