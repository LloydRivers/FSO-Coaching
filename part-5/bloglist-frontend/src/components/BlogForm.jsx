import React from "react";

const BlogForm = ({ addBlog, newBlog, setNewBlog }) => {
  return (
    <form
      onSubmit={addBlog}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "200px",
      }}
    >
      <input
        value={newBlog.title}
        onChange={({ target }) =>
          setNewBlog({ ...newBlog, title: target.value })
        }
        placeholder="Title"
      />
      <input
        value={newBlog.author}
        onChange={({ target }) =>
          setNewBlog({ ...newBlog, author: target.value })
        }
        placeholder="Author"
      />
      <input
        value={newBlog.url}
        onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
        placeholder="URL"
      />
      <button type="submit">save</button>
    </form>
  );
};

export default BlogForm;
