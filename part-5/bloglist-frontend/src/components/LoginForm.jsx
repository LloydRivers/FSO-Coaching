import React from 'react'

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
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '200px',
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
  )
}

export default LoginForm
