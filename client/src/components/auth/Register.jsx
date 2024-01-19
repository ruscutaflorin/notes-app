import React, { useState } from "react";
import "../../styles/register.css";
import useSignUp from "../../hooks/useSignUp";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editableUsername, setEditableUsername] = useState("");
  const [readOnlyUsername, setReadOnlyUsername] = useState("");
  const { signIn, error, isLoading } = useSignUp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password, editableUsername);
      navigate("/home");
    } catch (error) {
      console.log("SignIn failed:", error.response);
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Set the editable username to the part before '@' from the email
    const usernameFromEmail = emailValue.split("@")[0];
    setEditableUsername(usernameFromEmail);
    setReadOnlyUsername(usernameFromEmail);
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
            onChange={handleEmailChange}
            required
          />

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={readOnlyUsername}
            readOnly
            required
          />
          {/* Hidden input for editable username */}
          <input
            type="hidden"
            value={editableUsername}
            onChange={(e) => setEditableUsername(e.target.value)}
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
