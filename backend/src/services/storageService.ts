import { statfs } from "fs";

const storageSpace = () => {
	return new Promise((resolve, reject) => {
		statfs("/", (err, stats) => {
			if (err) reject(err);
			const response = {
				storageSpaceLeft: stats.bsize * stats.bavail,
				storageSize: stats.bsize * stats.blocks,
			};
			resolve(response);
		});
	});
};

export default storageSpace;
