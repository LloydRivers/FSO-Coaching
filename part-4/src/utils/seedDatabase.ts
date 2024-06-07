import logger from "./logger";
import { Blog } from "../models/blog";
import data from "../testData/data";
import { Types } from "mongoose";

const userID = new Types.ObjectId();

export async function seedDatabase() {
  try {
    await Blog.deleteMany({});

    for (const blog of data) {
      const newBlog = { ...blog, user: userID };
      await new Blog(newBlog).save();
    }

    logger.info("Database seeded successfully");
  } catch (error) {
    logger.error("Error seeding database:", error);
    process.exit(1);
  }
}
