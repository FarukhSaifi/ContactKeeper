import { API_ENDPOINTS } from "@/constants/api";
import { ROUTES } from "@/constants/routes";
import { tokenManager } from "@/utils/storage";
import api from "./base";

export const authService = {
  login: async (credentials) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get(API_ENDPOINTS.AUTH.GET_USER);
    return response.data;
  },

  logout: () => {
    tokenManager.remove();
    window.location.href = ROUTES.LOGIN;
  },
};

export default authService;
