import { Navigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { data, isPending, error } = authClient.useSession();


  if (data === undefined || data == null || isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load session</div>;
  }

  console.log(data)

  if (!data.user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}
