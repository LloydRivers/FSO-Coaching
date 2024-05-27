import mongoose from "mongoose";
import logger from "./src/utils/logger";

global.afterAll(async () => {
  logger.info("Closing database connection");
  await mongoose.disconnect();
});
