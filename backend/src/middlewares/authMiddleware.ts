import { Request, Response, NextFunction } from "express";

export const checkPassword = (req: Request, res: Response, next: NextFunction) => {
	const password = req.headers.authorization?.split(" ")[1];
	if (password === process.env.PASSWORD) next();
	else res.status(401).send("Unauthorized");
};
