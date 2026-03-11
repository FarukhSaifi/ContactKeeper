import React, { useCallback, useEffect, useReducer } from "react";
import { ERROR_MESSAGES } from "../../../constants/app";
import authService from "../../../services/api/auth";
import { tokenManager } from "../../../utils/storage";
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

const AuthState = (props) => {
  const token = tokenManager.get();
  const initialState = {
    token: token ?? null,
    isAuthenticated: false,
    loading: !!token,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loadUser = useCallback(async () => {
    if (tokenManager.get()) {
      try {
        const user = await authService.getCurrentUser();
        dispatch({ type: USER_LOADED, payload: user });
      } catch {
        dispatch({ type: AUTH_ERROR });
      }
    } else {
      dispatch({ type: USER_LOADED, payload: null });
    }
  }, []);

  const register = async (formData) => {
    try {
      const data = await authService.register(formData);
      dispatch({ type: REGISTER_SUCCESS, payload: data });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response?.data?.msg || err.message || ERROR_MESSAGES.REGISTRATION_FAILED,
      });
    }
  };

  const login = async (formData) => {
    try {
      const data = await authService.login(formData);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response?.data?.msg || err.message || ERROR_MESSAGES.LOGIN_FAILED,
      });
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      dispatch({ type: USER_LOADED, payload: null });
    }
  }, [loadUser, token]);

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
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
