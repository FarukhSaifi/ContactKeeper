/**
 * API configuration: base URL, endpoint paths, and request timeouts.
 * Used by services/api/base.js and the individual service modules.
 */

export const API_BASE_URL = "/api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth",
    REGISTER: "/users",
    GET_USER: "/auth",
  },
  CONTACTS: {
    BASE: "/contacts",
    BY_ID: (id) => `/contacts/${id}`,
  },
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const REQUEST_TIMEOUTS = {
  DEFAULT: 10000,
  UPLOAD: 30000,
};
