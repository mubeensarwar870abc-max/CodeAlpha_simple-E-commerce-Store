import { Navigate } from "react-router-dom";
import { useAdmin } from "../Context/AdminContext";

export const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export const AdminPublicRoute = ({ children }) => {
  const { isAuthenticated } = useAdmin();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};
