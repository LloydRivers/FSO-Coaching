import {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} from "../../utils/list_helper";
import data from "../../testData/data";

describe("List Helper", () => {
  describe("dummy function", () => {
    it("should return 1", () => {
      const result = dummy(data);
      expect(result).toBe(8);
    });
  });

  describe("totalLikes function", () => {
    it("should return the total likes", () => {
      const result = totalLikes(data);
      expect(result).toBe(1620);
    });
  });

  describe("favoriteBlog function", () => {
    it("should return the favorite blog", () => {
      const result = favoriteBlog(data);
      expect(result).toEqual({
        title: "Mastering React Hooks",
        author: "Emily Johnson",
        url: "https://example.com/react-hooks",
        likes: 300,
      });
    });
  });

  describe("mostBlogs function", () => {
    it("should return the author with the most blogs", () => {
      const result = mostBlogs(data);
      expect(result).toEqual({ author: "John Doe", blogs: 3 });
    });
  });

  describe("mostLikes function", () => {
    it("should return the author with the most likes", () => {
      const result = mostLikes(data);
      expect(result).toEqual({ author: "Emily Johnson", likes: 300 });
    });
  });
});
