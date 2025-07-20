import app from "./app.js";
import "dotenv/config";
import { logger } from "./utils/logger.js";

const PORT = process.env.PORT || 8000;

app.listen(PORT, "0.0.0.0", () => {
  logger.info(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
