import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  console.log({ user });
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
