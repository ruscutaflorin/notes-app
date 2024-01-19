import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return { logOut };
};

export default useLogout;
