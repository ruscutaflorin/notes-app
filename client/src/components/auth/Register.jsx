import React, { useState } from "react";
import "../../styles/register.css";
import useSignUp from "../../hooks/useSignUp";

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { signIn, error, isLoading } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password, username);
    } catch (error) {
      console.log("SignIn failed:", error.response);
    }
  };

  return (
    <div className="wrapper">
      <div className="register-container">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Register</button>
        </form>
        {/* {error && <div className="error">{error}</div>} */}
      </div>
    </div>
  );
};

export default RegisterComponent;
