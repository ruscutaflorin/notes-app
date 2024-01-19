import React, { useState } from "react";
import "../../styles/login.css";
import useLogin from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, error, isLoading } = useLogin();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await logIn(email, password);
      navigate("/home");
    } catch (error) {
      console.log("Login failed:", error.response);
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Login to your account 👏</h1>
        <div className="divider">
          <div className="line" />
          <div className="line" />
        </div>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <div className="custome-input">
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              autoComplete="off"
            />
            <i className="bx bx-at" />
          </div>
          <label htmlFor="password">Password:</label>
          <div className="custome-input">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
            />
            <i className="bx bx-lock-alt" />
          </div>
          <button type="submit" className="login">
            Login
          </button>
          <div className="links">
            <a href="/forgot-password">Reset Password</a>
            <a href="/register">Don't have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
