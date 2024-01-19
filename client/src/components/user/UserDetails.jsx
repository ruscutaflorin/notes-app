// UserDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

const UserDetails = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        console.log(user);
        if (user) {
          const response = await axios.get(
            `http://localhost:3001/api/notes/get-details?email=${user.username}`
          );
          setUserInfo(response.data);
          console.log("here", response.data);
        }
      } catch (error) {
        console.error("Error fetching user info:", error.message);
      }
    };

    fetchUserInfo();
  }, [user]);

  return (
    <div className="user-details">
      {userInfo ? (
        <>
          <p>Username: {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>
          <p>ID: {userInfo.id}</p>
        </>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default UserDetails;
