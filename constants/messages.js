module.exports = {
  WELCOME: "Welcome to Contact Keeper",
  API_NOT_FOUND: "API route not found",
  SERVER_ERROR: "Server error",
  AUTH: {
    NO_TOKEN: "No token, authorization denied",
    INVALID_TOKEN: "Token is not valid",
    NOT_CONFIGURED: "Server auth is not configured",
    JWT_SECRET_MISSING: "JWT secret is not configured",
    INVALID_CREDENTIALS: "Invalid credentials",
    USER_NOT_FOUND: "User not found",
    USER_EXISTS: "User already exists",
    RATE_LIMIT: "Too many auth attempts, please try again later",
  },
  CONTACT: {
    NOT_FOUND: "Contact not found",
    NOT_AUTHORIZED: "Not authorized",
    REMOVED: "Contact removed",
  },
  VALIDATION: {
    NAME_REQUIRED: "Name is required",
    EMAIL_INVALID: "Please include a valid email",
    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_MIN: "Password must be at least 6 characters",
    PHONE_REQUIRED: "Phone is required",
    TYPE_INVALID: "Invalid contact type",
  },
};
