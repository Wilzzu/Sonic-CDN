import { Router } from "express";
import storageSpace from "../services/storageService";

const router = Router();

router.get("/", (req, res) => {
	try {
		const storage = storageSpace();
		res.json(storage);
	} catch (error) {
		res.status(500).json({ message: (error as Error).message });
	}
});

export default router;
