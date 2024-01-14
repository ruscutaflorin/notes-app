import React, { useState } from "react";
import "../../styles/forgotPassword.css";

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  return (
    <div className="wrapper">
      <div className="wrapper">
        <div className="forgot-password-container">
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              required
            />

            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
