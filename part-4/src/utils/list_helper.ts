import { TestBlogType } from "../types";

export const dummy = (blogs: TestBlogType[]): number => {
  return blogs.length;
};

export const totalLikes = (blogs: TestBlogType[]): number => {
  return blogs.reduce((sum, blog) => sum + (blog.likes ?? 0), 0);
};

export const favoriteBlog = (blogs: TestBlogType[]): TestBlogType => {
  return blogs.reduce((max, blog) =>
    (blog.likes ?? 0) > (max.likes ?? 0) ? blog : max
  );
};

export const mostBlogs = (
  blogs: TestBlogType[]
): { author: string; blogs: number } => {
  const blogCount: Record<string, number> = {};
  blogs.forEach((blog) => {
    blogCount[blog.author] = (blogCount[blog.author] || 0) + 1;
  });

  const author = Object.keys(blogCount).reduce((a, b) =>
    blogCount[a] > blogCount[b] ? a : b
  );

  return { author, blogs: blogCount[author] };
};

export const mostLikes = (
  blogs: TestBlogType[]
): { author: string; likes: number } => {
  const mostLikedBlog = blogs.reduce(
    (max, blog) => {
      return (blog.likes ?? 0) > (max.likes ?? 0) ? blog : max;
    },
    { author: "", likes: 0 } as TestBlogType
  );

  return {
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes ?? 0,
  };
};
