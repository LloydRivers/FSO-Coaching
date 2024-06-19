import React, { useState } from "react";

const Blog = ({ blog, handleLike, handleRemove }) => {
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
        <div style={{ marginTop: "10px" }}>
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
          <span>{blog.user ? blog.user.name : "Unknown"}</span>
          <div>
            <button
              onClick={() => handleRemove(blog.id)}
              style={{ marginLeft: "10px" }}
            >
              Remove
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
