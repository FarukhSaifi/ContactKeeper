// Type definitions for the application

// User Types
export const UserTypes = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

// Contact Types
export const ContactTypes = {
  PERSONAL: 'personal',
  WORK: 'work',
  FAMILY: 'family',
  FRIEND: 'friend',
} as const;

// Theme Types
export const ThemeTypes = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

// API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

// User Interface
export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: keyof typeof UserTypes;
  createdAt: string;
  updatedAt: string;
}

// Contact Interface
export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  type: keyof typeof ContactTypes;
  user: string;
  createdAt: string;
  updatedAt: string;
}

// Auth State Interface
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Contact State Interface
export interface ContactState {
  contacts: Contact[];
  current: Contact | null;
  filtered: Contact[] | null;
  loading: boolean;
  error: string | null;
}

// Form Data Interfaces
export interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  type: keyof typeof ContactTypes;
}

// API Error Interface
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

// Theme Interface
export interface Theme {
  mode: keyof typeof ThemeTypes;
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
}
