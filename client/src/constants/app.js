export const APP_CONFIG = {
  NAME: "ContactKeeper",
  VERSION: "1.0.0",
  DESCRIPTION: "A modern contact management application",
};

export const STORAGE_KEYS = {
  TOKEN: "token",
  THEME: "theme",
  USER_PREFERENCES: "userPreferences",
};

export const CONTACT_TYPES = {
  PERSONAL: "personal",
  WORK: "work",
  FAMILY: "family",
  FRIEND: "friend",
};

export const CONTACT_TYPE_LIST = Object.values(CONTACT_TYPES);

export const CONTACT_STATS_INITIAL = {
  total: 0,
  personal: 0,
  work: 0,
  family: 0,
  friend: 0,
};

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

export const THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
};
