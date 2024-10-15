import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import { configDotenv } from "dotenv";
import path from "path";
import fs from "fs";

configDotenv();

const router = express.Router();

// Make sure the CDN directory exists
const uploadsDir = path.join(__dirname, process.env.CDN_DIR || "cdn/");
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, process.env.CDN_DIR || "cdn/");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

// Middleware to check for password
const checkPassword = (req: Request, res: Response, next: NextFunction) => {
	const password = req.headers.authorization?.split(" ")[1];
	if (password === process.env.PASSWORD) next();
	else res.status(401).send("Unauthorized");
};

// File upload endpoint
router.post(
	"/upload",
	checkPassword,
	upload.single("file"),
	(req: Request, res: Response): void => {
		if (!req.file) {
			res.status(400).send("No file uploaded.");
			return;
		}

		res.status(200).json({
			message: "File uploaded successfully",
			fileName: req.file.originalname,
		});
	}
);

export default router;
