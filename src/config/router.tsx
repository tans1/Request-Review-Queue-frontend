import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import LoginPage from "../pages/auth/login";
import RegistrationPage from "../pages/auth/register";
import AuthLayout from "../pages/auth/layout";
import DashboardPage from "../pages/dashboard";
import VerifyEmailPage from "../pages/auth/verify-email";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegistrationPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/api/auth/verify-email",
    element: <VerifyEmailPage />,
  },
]);
