import { STORAGE_KEYS } from "../constants/app";

// Local Storage utility functions
export const storage = {
  // Get item from localStorage
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item from localStorage: ${error.message}`);
      return null;
    }
  },

  // Set item in localStorage
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item in localStorage: ${error.message}`);
      return false;
    }
  },

  // Remove item from localStorage
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item from localStorage: ${error.message}`);
      return false;
    }
  },

  // Clear all localStorage
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error(`Error clearing localStorage: ${error.message}`);
      return false;
    }
  },
};

// Token management
export const tokenManager = {
  get: () => storage.get(STORAGE_KEYS.TOKEN),
  set: (token) => storage.set(STORAGE_KEYS.TOKEN, token),
  remove: () => storage.remove(STORAGE_KEYS.TOKEN),
  isValid: (token) => {
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },
};

// Theme management
export const themeManager = {
  get: () => storage.get(STORAGE_KEYS.THEME) || "light",
  set: (theme) => storage.set(STORAGE_KEYS.THEME, theme),
  remove: () => storage.remove(STORAGE_KEYS.THEME),
};

// User preferences management
export const preferencesManager = {
  get: () => storage.get(STORAGE_KEYS.USER_PREFERENCES) || {},
  set: (preferences) => storage.set(STORAGE_KEYS.USER_PREFERENCES, preferences),
  update: (updates) => {
    const current = preferencesManager.get();
    return preferencesManager.set({ ...current, ...updates });
  },
  remove: () => storage.remove(STORAGE_KEYS.USER_PREFERENCES),
};
