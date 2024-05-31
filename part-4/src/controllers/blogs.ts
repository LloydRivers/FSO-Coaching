import { Request, Response } from "express";
import { Blog } from "../models/blog";
import { User } from "../models/user";
import { BlogPost } from "../types";

export const getBlogs = async (req: Request, res: Response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
  });
  res.json(blogs);
};

export const postBlog = async (req: Request, res: Response) => {
  const body: BlogPost = req.body;

  if (!body.title || !body.url) {
    return res.status(400).json({ error: "title or url missing" });
  }

  const user = await User.findById(body.user);

  if (!user) {
    return res.status(400).json({ error: "user not found" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();

  res.status(201).json(savedBlog);
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
