import mongoose from "mongoose";
import supertest from "supertest";
import { Blog } from "../../models/blog";
import app from "../../app";

const api = supertest(app);

afterAll(() => {
  mongoose.connection.close();
});

describe("Blogs", () => {
  test("blogs are returned as json", async () => {
    try {
      const response = await api.get("/api/blogs");
      expect(response.headers["content-type"]).toMatch(/application\/json/);
      expect(response.status).toBe(200);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  });

  test("A valid blog can be added", async () => {
    const newBlog: Blog = {
      title: "Test Blog",
      author: "John Doe",
      url: "https://example.com/test-blog",
      likes: 100,
    };

    try {
      const intitialBlogs = await api.get("/api/blogs");
      const response = await api.post("/api/blogs").send(newBlog);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/application\/json/);
      expect(response.body.title).toBe(newBlog.title);
      expect(response.body.author).toBe(newBlog.author);
      expect(response.body.url).toBe(newBlog.url);
      expect(response.body.likes).toBe(newBlog.likes);
      const finalBlogs = await api.get("/api/blogs");
      expect(finalBlogs.body).toHaveLength(intitialBlogs.body.length + 1);
    } catch (error) {
      console.error("Error adding new blog:", error);
    }
  });

  test("default likes is 0", async () => {
    const newBlog: Blog = {
      title: "Test Blog",
      author: "John Doe",
      url: "https://example.com/test-blog",
    };

    try {
      const response = await api.post("/api/blogs").send(newBlog);
      expect(response.body.likes).toBe(0);
    } catch (error) {
      console.error("Error adding new blog:", error);
    }
  });

  test("a blog without content is not added", async () => {
    const newBlog: Blog = {
      title: "",
      author: "",
      url: "",
      likes: 100,
    };

    try {
      const response = await api.post("/api/blogs").send(newBlog);
      expect(response.status).toBe(400);
    } catch (error) {
      console.error("Error adding new blog:", error);
    }
  });

  test("returns id not _id", async () => {
    const newBlog: Blog = {
      title: "Test Blog",
      author: "John Doe",
      url: "https://example.com/test-blog",
      likes: 100,
    };

    try {
      const response = await api.post("/api/blogs").send(newBlog);
      expect(response.body.id).toBeDefined();
      expect(response.body._id).not.toBeDefined();
    } catch (error) {
      console.error("Error adding new blog:", error);
    }
  });

  test("a specific blog can be viewed", async () => {
    const blogs = await api.get("/api/blogs");
    const blogToView = blogs.body[0];
    const result = await api.get(`/api/blogs/${blogToView.id}`);
    expect(result.body).toEqual(blogToView);
  });

  test("a blog can be deleted", async () => {
    const blogs = await api.get("/api/blogs");
    const blogToDelete = blogs.body[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await api.get("/api/blogs");
    expect(blogsAtEnd.body).toHaveLength(blogs.body.length - 1);
  });
});
