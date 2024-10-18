import { NextFunction, Request, Response, Router } from "express";
import multer, { diskStorage } from "multer";
import { configDotenv } from "dotenv";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

configDotenv();

const router = Router();

// Make sure the CDN directory exists
const uploadsDir = path.join(__dirname, process.env.CDN_DIR || "cdn/");
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage
const storage = diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadsDir);
	},
	filename: (req, file, cb) => {
		// Remove file extension from original name, add UUID, and add file extension back
		const uuid = uuidv4().split("-")[0];
		const customUUID =
			uuid[0] +
			"w" +
			uuid[1] +
			"i" +
			uuid[2] +
			"l" +
			uuid[3] +
			"z" +
			uuid[4] +
			"z" +
			uuid[5] +
			"u" +
			uuid[6];

		const fileName = `${path.parse(file.originalname).name}-${customUUID}${
			path.parse(file.originalname).ext
		}`;
		cb(null, fileName);
		/* 	
		Delete temp file if the request is aborted
		Original code from: https://github.com/expressjs/multer/issues/259#issuecomment-691748926 (by @itsvaibhav10)
		*/
		req.on("aborted", () => {
			const fullFilePath = path.join(uploadsDir, fileName);
			file.stream.on("end", () => {
				fs.unlink(fullFilePath, (err) => {
					if (err) throw err;
				});
			});
			file.stream.emit("end");
		});
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
		// This triggers after file has been uploaded
		if (!req.file) {
			res.status(400).send("No file uploaded");
			return;
		}

		res.status(200).json({
			message: "File uploaded successfully",
			fileName: req.file.filename,
		});
	}
);

export default router;
