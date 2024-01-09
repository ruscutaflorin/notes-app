import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { Outlet } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <div className="top-menu">
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/ro/a/a3/Logo_ASE.png"
            alt="logo ase"
          />
          <Link to="/home">Corigentii</Link>
        </div>

        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/forgot-password">Forgot Password</Link>
          </li>
          <li>
            <Link to="/change-password">Change Password</Link>
          </li>
        </ul>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
