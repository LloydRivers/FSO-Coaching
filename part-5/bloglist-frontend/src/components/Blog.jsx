import React, { useState } from "react";

const Blog = ({ blog }) => {
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
          <div>Likes: {blog.likes}</div>
        </div>
      )}
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? "View less" : "View more"}
      </button>
    </div>
  );
};

export default Blog;
