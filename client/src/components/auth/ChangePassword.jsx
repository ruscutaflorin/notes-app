import React, { useState } from "react";
import "../../styles/changePassword.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const ChangePasswordComponent = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") setCurrentPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmNewPassword") setConfirmNewPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3001/api/auth/change-password?username=${user.username}&currentPassword=${currentPassword}&newPassword=${newPassword}`
      );

      console.log("Change Password response:", response.data);
    } catch (error) {
      console.error("Error changing password:", error.response.data);
    }
  };

  return (
    <div className="wrapper">
      <div className="change-password-container">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
            required
          />

          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmNewPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordComponent;
