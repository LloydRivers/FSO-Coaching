import { Request, Response } from "express";
import { Blog } from "../models/blog";
import { User } from "../models/user";
import { BlogPost } from "../types";
import jwt from "jsonwebtoken";

const getTokenFrom = (req: Request) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

export const getBlogs = async (req: Request, res: Response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  res.json(blogs);
};

export const postBlog = async (req: Request, res: Response) => {
  const body: BlogPost = req.body;

  const decodedToken = jwt.verify(
    getTokenFrom(req) as string,
    process.env.SECRET as string
  );

  if (!decodedToken || typeof decodedToken === "string") {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  if (!body.title || !body.url) {
    return res.status(400).json({ error: "title or url missing" });
  }

  const user = await User.findById(decodedToken.id);

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
  const { id } = req.params;
  const { title, author, url, likes, user, ...rest } = req.body;

  const userId = user.id || user;
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { title, author, url, likes, user: userId, ...rest },
    {
      new: true,
    }
  );
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
