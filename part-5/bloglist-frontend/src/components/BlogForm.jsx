import React from "react";

const BlogForm = ({ addBlog, newBlog, setNewBlog }) => {
  return (
    <form onSubmit={addBlog}>
      <input
        value={newBlog}
        onChange={({ target }) => setNewBlog(target.value)}
      />
      <button type="submit">save</button>
    </form>
  );
};

export default BlogForm;
