import mongoose, { Types, Schema } from "mongoose";
import supertest from "supertest";
import { Blog } from "../../types/";
import { User } from "../../models/user";
import app from "../../app";
import { Blog as Model } from "../../models/blog";

const api = supertest(app);
const userID = new Types.ObjectId();

afterAll(() => {
  mongoose.connection.close();
});

describe("Blogs", () => {
  beforeAll(async () => {
    await User.deleteMany({});
    await Model.deleteMany({});
  });
  describe("when there is initially some blogs saved", () => {
    beforeEach(async () => {
      await User.create({
        username: "user1",
        name: "UserOne",
        password: "password",
      });
      await Model.create({
        title: "Test Blog",
        author: "John Doe",
        url: "https://example.com/test-blog",
        likes: 10,
      });
    });
    test("blogs are returned as json", async () => {
      const response = await api.get("/api/blogs");
      expect(response.headers["content-type"]).toMatch(/application\/json/);
      expect(response.status).toBe(200);
    });
  });

  test("A valid blog can be added", async () => {
    const newUser = new User({
      username: "validblog",
      name: "TestUser",
      passwordHash: "password",
    });
    const savedUser = await newUser.save();

    const newBlog: Blog = {
      title: "Test Blog",
      author: "John Doe",
      url: "https://example.com/test-blog",
      likes: 100,
      // @ts-ignore
      user: savedUser._id,
    };

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
  });

  test("default likes is 0", async () => {
    const newUser = new User({
      username: "defaultlikes",
      name: "TestUser",
      passwordHash: "password",
    });
    const newBlog: Blog = {
      title: "Test Blog",
      author: "John Doe",
      url: "https://example.com/test-blog",
      // @ts-ignore
      user: newUser._id,
    };

    const response = await api.post("/api/blogs").send(newBlog);
    expect(response.body.likes).toBe(0);
  });

  test("a blog without content is not added", async () => {
    const newUser = new User({
      username: "nocontent",
      name: "TestUser",
      passwordHash: "password",
    });
    // This is 4.12*
    const newBlog: Blog = {
      title: "",
      author: "",
      url: "",
      likes: 100,
      // @ts-ignore
      user: newUser._id,
    };

    const response = await api.post("/api/blogs").send(newBlog);
    expect(response.status).toBe(400);
  });

  test("returns id not _id", async () => {
    const newUser = new User({
      username: "returnsid",
      name: "TestUser",
      passwordHash: "password",
    });
    const newBlog: Blog = {
      title: "Test Blog",
      author: "John Doe",
      url: "https://example.com/test-blog",
      likes: 100,
      // @ts-ignore
      user: newUser._id,
    };

    const response = await api.post("/api/blogs").send(newBlog);
    expect(response.body.id).toBeDefined();
    expect(response.body._id).not.toBeDefined();
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

  test("delete route returns 500 if blog does not exist", async () => {
    const response = await api.delete("/api/blogs/123456");
    expect(response.status).toBe(400);
  });

  test("a blog can be updated", async () => {
    const blogs = await api.get("/api/blogs");
    const blogToUpdate = blogs.body[0];
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog);
    expect(response.body.likes).toBe(updatedBlog.likes);
  });
});
