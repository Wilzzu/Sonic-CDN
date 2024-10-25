import { statfs } from "fs";

const storageSpace = () => {
	return statfs("/", (err, stats) => {
		if (err) throw err;
		return {
			storageSpaceLeft: stats.bsize * stats.bavail,
			storageSize: stats.bsize * stats.blocks,
		};
	});
};

export default storageSpace;
