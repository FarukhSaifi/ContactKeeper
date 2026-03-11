import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Components/Context/auth/AuthContext";
import { ROUTES } from "../constants/app";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, token, isAuthenticated, loading, error, login, register, logout, clearErrors, loadUser } = context;

  const requireAuth = (redirectTo = ROUTES.LOGIN) => {
    if (!isAuthenticated && !loading) {
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  const redirectIfAuthenticated = (redirectTo = ROUTES.HOME) => {
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
