/**
 * Auth API service: login, register, get current user, logout.
 * Uses shared api instance (base.js) which handles token attachment and 401.
 */
import { API_ENDPOINTS } from "../../constants/api";
import { ROUTES } from "../../constants/app";
import { tokenManager } from "../../utils/storage";
import api from "./base";

const authService = {
  /** POST /auth – returns { token } */
  login: async (credentials) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  /** POST /users – returns { token } */
  register: async (userData) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  /** GET /auth – returns user object (no password) */
  getCurrentUser: async () => {
    const response = await api.get(API_ENDPOINTS.AUTH.GET_USER);
    return response.data;
  },

  /** Clear token and redirect to login (client-side only) */
  logout: () => {
    tokenManager.remove();
    window.location.href = ROUTES.LOGIN;
  },
};

export default authService;
