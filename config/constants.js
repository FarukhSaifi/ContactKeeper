/**
 * Application-wide constants.
 * Use these instead of magic strings/numbers for consistent responses and easier maintenance.
 */

// HTTP status codes used in API responses
const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

// User-facing and log messages (auth, users, contacts, generic)
const MESSAGES = {
  // Auth
  NO_TOKEN: "Authorization denied",
  INVALID_TOKEN: "Invalid token",
  INVALID_CREDENTIALS: "Invalid credentials",
  INVALID_PASSWORD: "Invalid password",

  // Users
  USER_EXISTS: "User already exists",

  // Contacts
  CONTACT_NOT_FOUND: "Contact not found",
  NOT_AUTHORIZED: "Not authorized to access this contact",
  CONTACT_REMOVED: "Contact removed",
  INVALID_CONTACT_ID: "Invalid contact id",
  PROVIDE_FIELD_TO_UPDATE: "Provide at least one field to update: name, email, phone, type",

  // Generic
  SERVER_ERROR: "Server error",
  API_ROUTE_NOT_FOUND: "API route not found",
};

// JWT configuration
const JWT = {
  EXPIRES_IN: "24h",
};

// Allowed contact type values for validation
const CONTACT_TYPE = ["personal", "professional"];

// Fallback MongoDB URI when env and config are not set
const DEFAULT_MONGO_URI = "mongodb://localhost:27017/contactkeeper";

// Server config (PORT from env or this default)
const DEFAULT_PORT = 5001;
const WELCOME_MSG = "Welcome to Contact Keeper";

module.exports = {
  HTTP_STATUS,
  MESSAGES,
  JWT,
  CONTACT_TYPE,
  DEFAULT_MONGO_URI,
  DEFAULT_PORT,
  WELCOME_MSG,
};
