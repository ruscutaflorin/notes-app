import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signIn = async (email, password, username) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          email,
          password,
          username,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem("user", email);

        dispatch({ type: "LOGIN", payload: { email } });

        setIsLoading(false);
        console.log("SignUp successful:", response.data);
      } else {
        setIsLoading(false);
        setError("error");
        console.log("SignUp failed:", response.data);
      }
    } catch (error) {
      setIsLoading(false);
      setError("error");
      console.log("SignIn failed:", error);
    }
  };

  return { signIn, isLoading, error };
};

export default useSignUp;
