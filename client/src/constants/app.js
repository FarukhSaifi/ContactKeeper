// Application Constants
export const APP_CONFIG = {
  NAME: "ContactKeeper",
  VERSION: "1.0.0",
  DESCRIPTION: "A modern contact management application",
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  THEME: "theme",
  USER_PREFERENCES: "userPreferences",
};

// Contact Types
export const CONTACT_TYPES = {
  PERSONAL: "personal",
  WORK: "work",
  FAMILY: "family",
  FRIEND: "friend",
};

// Form Validation Rules
export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 128,
  },
  PHONE: {
    PATTERN: /^[\+]?[1-9][\d]{0,15}$/,
  },
};

// UI Constants
export const UI_CONFIG = {
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
  ANIMATION_DURATION: 300,
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },
};
