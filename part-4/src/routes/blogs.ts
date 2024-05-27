import { Router } from "express";
import {
  getBlogs,
  postBlog,
  getBlog,
  putBlog,
  deleteBlog,
} from "../controllers/blogs";

const router = Router();

router.get("/", getBlogs);
router.post("/", postBlog);
router.get("/:id", getBlog);
router.put("/:id", putBlog);
router.delete("/:id", deleteBlog);

export default router;
