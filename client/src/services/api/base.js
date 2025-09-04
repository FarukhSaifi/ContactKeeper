import axios from "axios";
import { API_BASE_URL, REQUEST_TIMEOUTS } from "../../constants/api";
import { handleError } from "../../utils/helpers";
import { tokenManager } from "../../utils/storage";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUTS.DEFAULT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.get();
    if (token && tokenManager.isValid(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = handleError(error);

    if (error.response?.status === 401) {
      // Token expired or invalid
      tokenManager.remove();
      // Don't redirect here, let the component handle it
      console.warn("Token expired or invalid, please login again");
    }

    return Promise.reject({
      ...error,
      message: errorMessage,
    });
  }
);

export default api;
