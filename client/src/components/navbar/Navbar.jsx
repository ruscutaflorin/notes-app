import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/navbar.module.css";
import { Outlet } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import UserDetails from "../user/UserDetails";

const Navbar = () => {
  const { logOut } = useLogout();
  const handleClick = () => {
    logOut();
  };
  const { user } = useAuthContext();

  return (
    <>
      <div className={styles.topmenu}>
        <div className={styles.logo}>
          <img
            src="https://upload.wikimedia.org/wikipedia/ro/a/a3/Logo_ASE.png"
            alt="logo ase"
          />
          <Link to="/home">Corigentii</Link>
        </div>
        {user ? (
          <div className={styles.authenticated}>
            <ul>
              <div>
                <UserDetails />
              </div>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/change-password">Change Password</Link>
              </li>
              <div>
                <button onClick={handleClick}>Log out</button>
              </div>
            </ul>
          </div>
        ) : (
          <div className={styles.unauthenticated}>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/forgot-password">Forgot Password</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
