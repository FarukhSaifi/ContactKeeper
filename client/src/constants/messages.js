export const ALERT_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

export const AUTH_MESSAGES = {
  LOGIN_FAILED: "Login failed",
  REGISTER_FAILED: "Registration failed",
  INVALID_CREDENTIALS: "Invalid credentials",
  LOGIN_SUCCESS: "Logged in successfully",
  REGISTER_SUCCESS: "Account created successfully",
};

export const CONTACT_MESSAGES = {
  LOAD_FAILED: "Error loading contacts",
  ADD_FAILED: "Error adding contact",
  UPDATE_FAILED: "Error updating contact",
  DELETE_FAILED: "Error deleting contact",
  ADD_SUCCESS: "Contact added successfully",
  UPDATE_SUCCESS: "Contact updated successfully",
  DELETE_SUCCESS: "Contact deleted successfully",
  DELETE_CONFIRM: (name) => `Are you sure you want to delete ${name}?`,
};

export const APP_MESSAGES = {
  GENERIC_ERROR: "An error occurred",
  SERVER_ERROR: "Server error",
};
