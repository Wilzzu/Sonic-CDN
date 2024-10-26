import { Router } from "express";
import storageSpace from "../services/storageService";

const router = Router();

router.get("/", async (req, res) => {
	try {
		const storage = await storageSpace();
		res.status(200).json(storage);
	} catch (error) {
		res.status(500).json((error as Error).message);
	}
});

export default router;
