import React, { useEffect } from "react";
import LandingPage from "../components/home/LandingPage";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  useEffect(() => {
    if (!user || !user.username) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div>
      <LandingPage />
    </div>
  );
};

export default HomePage;
