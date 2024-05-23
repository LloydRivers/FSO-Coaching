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

export const mostLikes = (blogs: Blog[]): { author: string; likes: number } => {
  // Comments to explain the reduce function.
  const mostLikedBlog = blogs.reduce(
    (max, blog) => {
      /*
      We initialize the accumulator with an object that has an author property and a likes property.

      We know that on every loop the blog object will have an author and likes property (see the data in the testData/data.ts file).

      Loop one (author: "John Doe")

      is 150 > 0? Yes, so return the blog object. Since we are returning the blog object, the accumulator will be updated with the blog object.
      */
      return blog.likes > max.likes ? blog : max;
    },
    { author: "", likes: 0 } as Blog // <-- Initial accumulator value.
    // loop 1: { author: "John Doe", likes: 150 }
    // This repeats for every blog object in the array. Hopefully this makes sense.
  );

  return {
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };
};
