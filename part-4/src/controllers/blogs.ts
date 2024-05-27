import { Request, Response, NextFunction } from "express";
import { Blog } from "../models/blog";
import logger from "../utils/logger";

export const getBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const postBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.title || !req.body.url || !req.body.author) {
      return res.status(400).json({ error: "title, author, or url missing" });
    }
    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.json(savedBlog);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const getBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const putBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(updatedBlog);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(204).end();
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

export default { getBlogs, postBlog, getBlog, putBlog, deleteBlog };
