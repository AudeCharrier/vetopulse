import "dotenv/config";

import app from "./app";

const port = process.env.APP_PORT || 3310;

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
