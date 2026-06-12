import AuthContext from "@/components/Context/auth/AuthContext";
import { HOOK_ERRORS } from "@/constants/errors";
import { ROUTES } from "@/constants/routes";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error(HOOK_ERRORS.USE_AUTH_CONTEXT);
  }

  const { user, token, isAuthenticated, loading, error, login, register, logout, clearErrors, loadUser } = context;

  // Redirect to login if not authenticated
  const requireAuth = (redirectTo = ROUTES.LOGIN) => {
    if (!isAuthenticated && !loading) {
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  // Redirect to home if already authenticated
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
