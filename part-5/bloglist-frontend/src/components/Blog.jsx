import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, handleLike }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        marginBottom: "10px",
        padding: "10px",
        border: "1px solid #ccc",
      }}
    >
      <div>
        {blog.title} {blog.author}
      </div>
      {expanded && (
        <div>
          <div>URL: {blog.url}</div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <span>Likes: {blog.likes}</span>
            <button
              onClick={() => handleLike(blog.id)}
              style={{ marginLeft: "10px" }}
            >
              Like
            </button>
          </div>
        </div>
      )}
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? "View less" : "View more"}
      </button>
    </div>
  );
};

export default Blog;
