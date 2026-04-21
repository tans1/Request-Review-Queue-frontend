import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import LoginPage from "../pages/auth/login";
import RegistrationPage from "../pages/auth/register";
import AuthLayout from "../pages/auth/layout";
import DashboardPage from "../pages/dashboard";
import VerifyEmailPage from "../pages/auth/verify-email";
import ConfirmationPage from "../pages/auth/confirmation";
import ProtectedRoute from "../pages/protected";
import RequestDetailsPage from "../pages/details";
import NotFoundPage from "../pages/404";

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
      {
        path: "confirmation",
        element: <ConfirmationPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/details",
    element: (
      <ProtectedRoute>
        <RequestDetailsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/api/auth/verify-email",
    element: <VerifyEmailPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);
