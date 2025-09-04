import React, { useCallback, useEffect, useReducer } from "react";
import api from "../../../services/api";
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
  const token = localStorage.getItem("token");
  const initialState = {
    token: token,
    isAuthenticated: false,
    loading: !!token, // Only show loading if there's a token to verify
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load user
  const loadUser = useCallback(async () => {
    if (localStorage.token) {
      try {
        const res = await api.get("/auth");
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      } catch (err) {
        dispatch({ type: AUTH_ERROR });
      }
    } else {
      // No token, set as not authenticated
      dispatch({
        type: USER_LOADED,
        payload: null,
      });
    }
  }, []);

  // Register user
  const register = async (formData) => {
    try {
      const res = await api.post("/users", formData);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response?.data?.msg || "Registration failed",
      });
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const res = await api.post("/auth", formData);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response?.data?.msg || "Login failed",
      });
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // Clear errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      // No token, set loading to false immediately
      dispatch({
        type: USER_LOADED,
        payload: null,
      });
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
