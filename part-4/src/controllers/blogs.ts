import { Router, Request, Response } from "express";
import { Blog } from "../models/blog";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

router.post("/", async (req: Request, res: Response) => {
  const blog = new Blog(req.body);
  const savedBlog = await blog.save();
  res.json(savedBlog);
});

router.get("/:id", async (req: Request, res: Response) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

router.put("/:id", async (req: Request, res: Response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedBlog);
});
export default router;
