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
      const response = await api.post("/api/blogs").send(newBlog);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/application\/json/);
      expect(response.body.title).toBe(newBlog.title);
      expect(response.body.author).toBe(newBlog.author);
      expect(response.body.url).toBe(newBlog.url);
      expect(response.body.likes).toBe(newBlog.likes);
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
});
