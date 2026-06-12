import { STORAGE_KEYS } from "../constants/app";

const getRaw = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error.message);
    return null;
  }
};

const setRaw = (key, value) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Error writing localStorage key "${key}":`, error.message);
    return false;
  }
};

const removeRaw = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error.message);
    return false;
  }
};

const getJson = (key, fallback = null) => {
  const item = getRaw(key);
  if (!item) return fallback;
  try {
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error.message);
    return fallback;
  }
};

const setJson = (key, value) => setRaw(key, JSON.stringify(value));

export const storage = {
  get: (key) => getJson(key),
  set: (key, value) => setJson(key, value),
  remove: (key) => removeRaw(key),
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error.message);
      return false;
    }
  },
};

export const tokenManager = {
  get: () => getRaw(STORAGE_KEYS.TOKEN),
  set: (token) => setRaw(STORAGE_KEYS.TOKEN, token),
  remove: () => removeRaw(STORAGE_KEYS.TOKEN),
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
  get: () => getRaw(STORAGE_KEYS.THEME) || "light",
  set: (theme) => setRaw(STORAGE_KEYS.THEME, theme),
  remove: () => removeRaw(STORAGE_KEYS.THEME),
};

export const preferencesManager = {
  get: () => getJson(STORAGE_KEYS.USER_PREFERENCES, {}),
  set: (preferences) => setJson(STORAGE_KEYS.USER_PREFERENCES, preferences),
  update: (updates) => {
    const current = preferencesManager.get();
    return preferencesManager.set({ ...current, ...updates });
  },
  remove: () => removeRaw(STORAGE_KEYS.USER_PREFERENCES),
};
