import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Components/Context/auth/AuthContext";

// Custom hook for authentication
export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    clearErrors,
    loadUser,
  } = context;

  // Redirect to login if not authenticated
  const requireAuth = (redirectTo = "/login") => {
    if (!isAuthenticated && !loading) {
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  // Redirect to home if already authenticated
  const redirectIfAuthenticated = (redirectTo = "/") => {
    if (isAuthenticated && !loading) {
      navigate(redirectTo);
      return true;
    }
    return false;
  };

  return {
    // State
    user,
    token,
    isAuthenticated,
    loading,
    error,

    // Actions
    login,
    register,
    logout,
    clearErrors,
    loadUser,

    // Utilities
    requireAuth,
    redirectIfAuthenticated,
  };
};
