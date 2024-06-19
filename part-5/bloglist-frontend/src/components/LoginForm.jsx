import React from "react";
import PropTypes from "prop-types";

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  setShowLoginForm,
  showLoginForm,
}) => {
  return (
    <>
      {showLoginForm ? (
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "200px",
          }}
        >
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            placeholder="Username"
          />
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
            type="password"
          />
          <button type="submit">login</button>
          <button type="button" onClick={() => setShowLoginForm(false)}>
            cancel
          </button>
        </form>
      ) : (
        <button onClick={() => setShowLoginForm(true)}>login</button>
      )}
    </>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setShowLoginForm: PropTypes.func.isRequired,
  showLoginForm: PropTypes.bool.isRequired,
};
export default LoginForm;
