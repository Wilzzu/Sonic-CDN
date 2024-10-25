import multer, { diskStorage } from "multer";
import { configDotenv } from "dotenv";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

configDotenv();

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
		const uuid = "w" + uuidv4().split("-")[0].slice(0, 7);
		const fileName = `${path.parse(file.originalname).name}-${uuid}${
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
export default upload;
