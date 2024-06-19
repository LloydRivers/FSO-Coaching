import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [showAll, setShowAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Wrong credentials");
      console.error(error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      setBlogs((prevBlogs) => [...prevBlogs, blog]);
      setNewBlog({
        title: "",
        author: "",
        url: "",
      });
      setShowBlogForm(false);
      setErrorMessage("Blog added successfully!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (error) {
      setErrorMessage("Failed to add blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLike = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(id, updatedBlog);
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)));
  };
  return (
    <div>
      <h2>Blogs App</h2>

      <Notification message={errorMessage} />

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setShowLoginForm={setShowLoginForm}
          showLoginForm={showLoginForm}
        />
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <p>{user?.name} logged-in</p>
            <button onClick={handleLogout}>logout</button>
          </div>
          <button onClick={() => setShowBlogForm(!showBlogForm)}>
            new blog
          </button>
          {showBlogForm && (
            <BlogForm
              addBlog={addBlog}
              newBlog={newBlog}
              setNewBlog={setNewBlog}
            />
          )}
        </div>
      )}
      {/* {user && (
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            {showAll ? "show less" : "show all"}
          </button>
        </div>
      )} */}

      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} handleLike={handleLike} />
        ))}
      </div>
    </div>
  );
};

export default App;
