import { ALERT_TYPES, AUTH_MESSAGES } from "@/constants/messages";
import { useAlert } from "@/hooks/useAlert";
import authService from "@/services/api/auth";
import { tokenManager } from "@/utils/storage";
import { useCallback, useEffect, useReducer } from "react";
import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "../types";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

const AuthState = ({ children }) => {
  const { setAlert } = useAlert();
  const token = tokenManager.get();
  const initialState = {
    token,
    isAuthenticated: false,
    loading: Boolean(token),
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loadUser = useCallback(async () => {
    if (!tokenManager.get()) {
      dispatch({ type: USER_LOADED, payload: null });
      return;
    }

    try {
      const user = await authService.getCurrentUser();
      dispatch({ type: USER_LOADED, payload: user });
    } catch {
      dispatch({ type: AUTH_ERROR });
    }
  }, []);

  const register = async (formData) => {
    try {
      const data = await authService.register(formData);
      dispatch({ type: REGISTER_SUCCESS, payload: data });
      setAlert(AUTH_MESSAGES.REGISTER_SUCCESS, ALERT_TYPES.SUCCESS);
      await loadUser();
    } catch (err) {
      const message = err.response?.data?.msg || AUTH_MESSAGES.REGISTER_FAILED;
      dispatch({ type: REGISTER_FAIL, payload: message });
      setAlert(message, ALERT_TYPES.ERROR);
    }
  };

  const login = async (formData) => {
    try {
      const data = await authService.login(formData);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      setAlert(AUTH_MESSAGES.LOGIN_SUCCESS, ALERT_TYPES.SUCCESS);
      await loadUser();
    } catch (err) {
      const message = err.response?.data?.msg || AUTH_MESSAGES.LOGIN_FAILED;
      dispatch({ type: LOGIN_FAIL, payload: message });
      setAlert(message, ALERT_TYPES.ERROR);
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        clearErrors,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
