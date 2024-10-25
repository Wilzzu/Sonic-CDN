import { Request, Response, Router } from "express";
import { checkPassword } from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadMiddleware";

const router = Router();

// File upload endpoint
router.post("/", checkPassword, upload.single("file"), (req: Request, res: Response): void => {
	// This triggers after file has been uploaded
	if (!req.file) {
		res.status(400).send("No file uploaded");
		return;
	}

	res.status(200).json({
		message: "File uploaded successfully",
		uploadedFile: { fileName: req.file.filename, fileSize: req.file.size },
	});
});

export default router;
