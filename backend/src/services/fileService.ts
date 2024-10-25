import fs from "fs/promises";
import path from "path";

const uploadsDir = path.join(__dirname, process.env.CDN_DIR || "cdn/");

export async function renameFile(oldName: string, newName: string): Promise<void> {
	try {
		const oldPath = path.join(uploadsDir, oldName);
		const newPath = path.join(uploadsDir, newName);
		await fs.rename(oldPath, newPath);
	} catch (error) {
		throw new Error("Failed to rename file: " + (error as Error).message);
	}
}

export async function deleteFile(fileName: string): Promise<void> {
	try {
		const filePath = path.join(uploadsDir, fileName);
		await fs.unlink(filePath);
	} catch (error) {
		throw new Error("Failed to delete file: " + (error as Error).message);
	}
}
