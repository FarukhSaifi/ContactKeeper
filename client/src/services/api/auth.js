import { API_ENDPOINTS } from "../../constants/api";
import api from "./base";

// Auth API service
export const authService = {
  // Login user
  login: async (credentials) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  // Register user
  register: async (userData) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get(API_ENDPOINTS.AUTH.GET_USER);
    return response.data;
  },

  // Logout (client-side only)
  logout: () => {
    // Clear token from storage
    localStorage.removeItem("token");
    // Redirect to login
    window.location.href = "/login";
  },
};

export default authService;
