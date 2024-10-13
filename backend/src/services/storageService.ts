import { statfs } from "fs";

const space = statfs("/", (err, stats) => {
	if (err) throw err;
	return stats.bsize * stats.bavail;
});
