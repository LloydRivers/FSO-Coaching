import { Router, Request, Response, NextFunction } from "express";
import { Blog } from "../models/blog";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.title || !req.body.url || !req.body.author) {
      return res.status(400).json({ error: "title, author, or url missing" });
    }
    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.json(savedBlog);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
      if (!deletedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
