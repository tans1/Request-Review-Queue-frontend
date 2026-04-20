import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import LoginPage from "../pages/auth/login";
import RegistrationPage from "../pages/auth/register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegistrationPage />,
  },
]);
