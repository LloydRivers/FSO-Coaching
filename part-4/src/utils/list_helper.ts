import { Blog } from "../models/blog";

export const dummy = (blogs: Blog[]): number => {
  return blogs.length;
};
