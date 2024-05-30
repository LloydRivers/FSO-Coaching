import { Request, Response } from "express";
import { Blog } from "../models/blog";

export const getBlogs = async (req: Request, res: Response) => {
  const blogs = await Blog.find({});
  res.json(blogs);
};

export const postBlog = async (req: Request, res: Response) => {
  if (!req.body.title || !req.body.url || !req.body.author) {
    return res.status(400).json({ error: "title, author, or url missing" });
  }
  const blog = new Blog(req.body);
  const savedBlog = await blog.save();
  res.json(savedBlog);
};

export const getBlog = async (req: Request, res: Response) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  res.json(blog);
};

export const putBlog = async (req: Request, res: Response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedBlog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  res.json(updatedBlog);
};

export const deleteBlog = async (req: Request, res: Response) => {
  const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
  if (!deletedBlog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  res.status(204).end();
};
