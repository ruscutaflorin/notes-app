import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login/login";
import RegisterPage from "../pages/login/register";
import ForgotPasswordPage from "../pages/login/forgot-password";
import ChangePasswordPage from "../pages/login/change-password";
import Navbar from "../components/Navbar";
import HomePage from "../pages/home";
import NotesPage from "../pages/notesPages";
import ErrorPage from "../routes/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/change-password",
        element: <ChangePasswordPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/notes",
        element: <NotesPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
