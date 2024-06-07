import mongoose from "mongoose";
import supertest from "supertest";
import { Blog } from "../../types/";
import app from "../../app";

const api = supertest(app);

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWQiOiI2NjYzNzgwMTJlMjQ0ZGM3ODhiNjQ0OWYiLCJpYXQiOjE3MTc3OTQ4NTMsImV4cCI6MTcxNzc5ODQ1M30.lOWGJd2UGH17d_Llq9ob3qY-Ol0RyzbWdTN28Kru1HA";

afterAll(() => {
  mongoose.connection.close();
});

describe("Blogs", () => {
  describe("when there is initially some blogs saved", () => {
    test("blogs are returned as json", async () => {
      const response = await api.get("/api/blogs");
      expect(response.headers["content-type"]).toMatch(/application\/json/);
      expect(response.status).toBe(200);
    });
  });

  test("A valid blog can be added", async () => {
    const newBlog: Blog = {
      title: "Test Blog",
      author: "John Doe",
      url: "https://example.com/test-blog",
      likes: 100,
      // @ts-ignore
      user: "666378012e244dc788b6449f",
    };

    const intitialBlogs = await api.get("/api/blogs");

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog);

    expect(response.status).toBe(201);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.body.title).toBe(newBlog.title);
    expect(response.body.author).toBe(newBlog.author);
    expect(response.body.url).toBe(newBlog.url);
    expect(response.body.likes).toBe(newBlog.likes);
    const finalBlogs = await api.get("/api/blogs");
    expect(finalBlogs.body).toHaveLength(intitialBlogs.body.length + 1);
  });

  test("default likes is 0", async () => {
    const newBlog: Blog = {
      title: "Test Blogg",
      author: "John Does",
      url: "https://example.com/test-blog",
      // @ts-ignore
      user: "666378012e244dc788b6449f",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog);
    expect(response.body.likes).toBe(0);
  });

  test("a blog without content is not added", async () => {
    const newBlog: Blog = {
      title: "",
      author: "",
      url: "",
      likes: 100,
      // @ts-ignore
      user: "666378012e244dc788b6449f",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog);
    expect(response.status).toBe(400);
  });

  test("returns id not _id", async () => {
    const newBlog: Blog = {
      title: "Test Blog",
      author: "John Doe",
      url: "https://example.com/test-blog",
      likes: 100,
      // @ts-ignore
      user: "666378012e244dc788b6449f",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog);

    expect(response.body.id).toBeDefined();
    expect(response.body._id).not.toBeDefined();
  });

  test("a specific blog can be viewed", async () => {
    const blogs = await api.get("/api/blogs");
    const blogToView = blogs.body[0];
    const result = await api.get(`/api/blogs/${blogToView.id}`);
    expect(result.body.id).toEqual(blogToView.id);
  });

  test("a blog can be deleted", async () => {
    const blogs = await api.get("/api/blogs");
    const blogToDelete = blogs.body[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await api.get("/api/blogs");
    expect(blogsAtEnd.body).toHaveLength(blogs.body.length - 1);
  });

  test("delete route returns 500 if blog does not exist", async () => {
    const response = await api.delete("/api/blogs/123456");
    expect(response.status).toBe(400);
  });

  test("a blog can be updated", async () => {
    const newBlogResponse = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Blog",
        author: "John Doe",
        url: "https://example.com/test-blog",
        likes: 100,
        user: "666378012e244dc788b6449f",
      });
    const newBlog = newBlogResponse.body;

    // Update the blog
    const updatedBlogData = { ...newBlog, likes: newBlog.likes + 1 };

    const response = await api
      .put(`/api/blogs/${newBlog.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedBlogData);

    console.log("Response:", response.body);

    expect(response.body.likes).toBe(updatedBlogData.likes);
  });
});
