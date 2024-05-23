import { Blog } from "../models/blog";

export const dummy = (blogs: Blog[]): number => {
  return blogs.length;
};

export const totalLikes = (blogs: Blog[]): number => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

export const favoriteBlog = (blogs: Blog[]): Blog => {
  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max));
};
export const mostBlogs = (blogs: Blog[]): { author: string; blogs: number } => {
  const blogCount: Record<string, number> = {};
  blogs.forEach((blog) => {
    blogCount[blog.author] = (blogCount[blog.author] || 0) + 1;
  });

  const author = Object.keys(blogCount).reduce((a, b) =>
    blogCount[a] > blogCount[b] ? a : b
  );

  return { author, blogs: blogCount[author] };
};
