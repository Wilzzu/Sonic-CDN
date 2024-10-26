import { Request, Response, Router } from "express";
import { renameFile, deleteFile } from "../services/fileService";

const router = Router();

// Route to rename a file
router.put("/rename", async (req: Request, res: Response): Promise<void> => {
	const { oldName, newName } = req.body;
	if (!oldName || !newName) {
		res.status(400).json("Both oldName and newName are required");
		return;
	}

	try {
		await renameFile(oldName, newName);
		res.status(200).json("File renamed successfully");
	} catch (error) {
		res.status(500).json((error as Error).message);
	}
});

// Route to delete a file
router.delete("/delete", async (req: Request, res: Response): Promise<void> => {
	const { fileName } = req.body;
	if (!fileName) {
		res.status(400).json("File name is required");
		return;
	}

	try {
		await deleteFile(fileName);
		res.status(200).json("File deleted successfully");
	} catch (error) {
		res.status(500).json((error as Error).message);
	}
});

export default router;
