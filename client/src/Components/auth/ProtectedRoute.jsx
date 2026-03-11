import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/app";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../ui/Loading";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return children;
};

export default ProtectedRoute;
