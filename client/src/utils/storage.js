/**
 * Local storage helpers and token/theme/preferences managers.
 * storage.get supports both JSON-stored and raw string values for backward compatibility.
 */
import { STORAGE_KEYS } from "../constants/app";

export const storage = {
  /** Get value by key; parses JSON when possible, otherwise returns raw string */
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      if (item == null) return null;
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch (error) {
      console.error(`Error getting item from localStorage: ${error.message}`);
      return null;
    }
  },

  /** Store value; strings stored as-is, other types JSON.stringify'd */
  set: (key, value) => {
    try {
      const toStore = typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(key, toStore);
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

  /** Clear entire localStorage */
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

/** JWT token: get/set/remove via STORAGE_KEYS.TOKEN; isValid checks exp from payload */
export const tokenManager = {
  get: () => storage.get(STORAGE_KEYS.TOKEN),
  set: (token) => storage.set(STORAGE_KEYS.TOKEN, token),
  remove: () => storage.remove(STORAGE_KEYS.TOKEN),
  /** True if token exists and JWT exp (seconds) is in the future */
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

export const themeManager = {
  get: () => storage.get(STORAGE_KEYS.THEME) || "light",
  set: (theme) => storage.set(STORAGE_KEYS.THEME, theme),
  remove: () => storage.remove(STORAGE_KEYS.THEME),
};

export const preferencesManager = {
  get: () => storage.get(STORAGE_KEYS.USER_PREFERENCES) || {},
  set: (preferences) => storage.set(STORAGE_KEYS.USER_PREFERENCES, preferences),
  update: (updates) => {
    const current = preferencesManager.get();
    return preferencesManager.set({ ...current, ...updates });
  },
  remove: () => storage.remove(STORAGE_KEYS.USER_PREFERENCES),
};
