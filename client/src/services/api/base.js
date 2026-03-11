/**
 * Shared axios instance for all API calls.
 * - Base URL and timeout from constants/api.js
 * - Request: attaches Bearer token from tokenManager when present and valid
 * - Response: on 401 removes token and rejects with a normalized error (message set via handleError)
 */
import axios from "axios";
import { API_BASE_URL, REQUEST_TIMEOUTS } from "../../constants/api";
import { handleError } from "../../utils/helpers";
import { tokenManager } from "../../utils/storage";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUTS.DEFAULT,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT to every request when available and not expired
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.get();
    if (token && tokenManager.isValid(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Normalize errors and clear token on 401 (components handle redirect)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = handleError(error);
    if (error.response?.status === 401) {
      tokenManager.remove();
      console.warn("Token expired or invalid, please login again");
    }
    return Promise.reject({ ...error, message: errorMessage });
  },
);

export default api;
