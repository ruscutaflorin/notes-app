import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const logIn = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        // Successful response
        localStorage.setItem("user", email);

        // Update the auth context
        dispatch({ type: "LOGIN", payload: { email } });

        setIsLoading(false);
        console.log("LogIn successful:", response.data);
      } else {
        // Error response
        setIsLoading(false);
        setError("error");
        console.log("LogIn failed:", response.data);
      }
    } catch (error) {
      // Network error or other issues
      setIsLoading(false);
      setError("error");
      console.log("LogIn failed:", error);
    }
  };

  return { logIn, isLoading, error };
};

export default useLogin;
