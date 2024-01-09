import React from "react";
import "../styles/login.css";
import image from "../images/logo.jpg";

const LoginComponent = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <h1>Login to your account 👏</h1>
        <div className="social-login">
          <button className="google">
            <i className="bx bxl-google" />
            Use Google
          </button>
          <button className="google">
            <i className="bx bxl-apple" />
            Use Apple
          </button>
        </div>
        <div className="divider">
          <div className="line" />
          <p>Or</p>
          <div className="line" />
        </div>
        <form>
          <label htmlFor="email">Email:</label>
          <div className="custome-input">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              autoComplete="off"
            />
            <i className="bx bx-at" />
          </div>
          <label htmlFor="password">Password:</label>
          <div className="custome-input">
            <input
              type="password"
              name="password"
              placeholder="Your Password"
            />
            <i className="bx bx-lock-alt" />
          </div>
          <button className="login">Login</button>
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
