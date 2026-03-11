/**
 * Application-wide constants for the client.
 * Use these for routes, storage keys, error fallbacks, and validation/UI config.
 */

// App metadata
export const APP_CONFIG = {
  NAME: "ContactKeeper",
  VERSION: "1.0.0",
  DESCRIPTION: "A modern contact management application",
};

// Route paths – use for <Link to>, redirects, and href
export const ROUTES = {
  LOGIN: "/login",
  HOME: "/",
  ABOUT: "/about",
  REGISTER: "/register",
};

// Fallback error messages when the API does not return a message
export const ERROR_MESSAGES = {
  REGISTRATION_FAILED: "Registration failed",
  LOGIN_FAILED: "Login failed",
  LOAD_CONTACTS: "Error loading contacts",
  ADD_CONTACT: "Error adding contact",
  UPDATE_CONTACT: "Error updating contact",
  DELETE_CONTACT: "Error deleting contact",
};

// Local storage keys (used by storage.js and tokenManager)
export const STORAGE_KEYS = {
  TOKEN: "token",
  THEME: "theme",
  USER_PREFERENCES: "userPreferences",
};

// Contact type labels (server allows "personal" and "professional")
export const CONTACT_TYPES = {
  PERSONAL: "personal",
  WORK: "work",
  FAMILY: "family",
  FRIEND: "friend",
};

// Client-side validation rules (lengths, patterns)
export const VALIDATION_RULES = {
  NAME: { MIN_LENGTH: 2, MAX_LENGTH: 50 },
  EMAIL: { PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  PASSWORD: { MIN_LENGTH: 6, MAX_LENGTH: 128 },
  PHONE: { PATTERN: /^[+]?[1-9][\d]{0,15}$/ },
};

// UI timing and pagination
export const UI_CONFIG = {
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
  ANIMATION_DURATION: 300,
  PAGINATION: { DEFAULT_PAGE_SIZE: 10, MAX_PAGE_SIZE: 100 },
};

// UI copy (labels, headings, descriptions)
export const UI_COPY = {
  AUTH_LOGIN_TITLE: "Sign in to your account",
  AUTH_LOGIN_SUBTITLE: "Welcome back! Please sign in to continue.",
  AUTH_REGISTER_TITLE: "Create your account",
  AUTH_REGISTER_SUBTITLE: "Join us today and start managing your contacts.",
  AUTH_PROCESSING: "Processing...",
  ABOUT_TITLE: "About Contact Keeper",
  ABOUT_WELCOME: "Welcome to Contact Keeper",
  ABOUT_DESCRIPTION:
    "Contact Keeper is a modern, intuitive contact management application built with React, Material-UI, and Tailwind CSS. It provides a seamless experience for managing your personal and professional contacts with a beautiful, responsive interface.",
  CONTACT_ADD_BUTTON: "Add Contact",
  CONTACT_UPDATE_BUTTON: "Update Contact",
};
