import { dummy } from "../../utils/list_helper";
import { IBlog } from "../../models/blog";

test("dummy returns one", () => {
  const blogs: IBlog[] = [];
  const result = dummy(blogs);
  expect(result).toBe(1);
});
