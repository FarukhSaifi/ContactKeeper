// API Configuration Constants
export const API_BASE_URL = "/api";

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth",
    REGISTER: "/users",
    GET_USER: "/auth",
  },

  // Contact endpoints
  CONTACTS: {
    BASE: "/contacts",
    BY_ID: (id) => `/contacts/${id}`,
  },
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Request Timeouts
export const REQUEST_TIMEOUTS = {
  DEFAULT: 10000,
  UPLOAD: 30000,
};
