import { dummy } from "../../utils/list_helper";
import { Blog } from "../../models/blog";

test("dummy returns one", () => {
  const testBlog: Blog = {
    title: "dummy",
    author: "dummy",
    url: "dummy",
    likes: 0,
  };
  const blogs = [testBlog];
  const result = dummy(blogs);
  expect(result).toBe(1);
});
