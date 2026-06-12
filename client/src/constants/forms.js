import { CONTACT_TYPES } from "./app";

export const EMPTY_CONTACT = {
  name: "",
  email: "",
  phone: "",
  type: CONTACT_TYPES.PERSONAL,
};

export const AUTH_FORM_MODES = {
  LOGIN: "login",
  REGISTER: "register",
};

export const LOGIN_FORM_INITIAL = {
  email: "",
  password: "",
  remember: false,
};

export const REGISTER_FORM_INITIAL = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const FORM_PLACEHOLDERS = {
  CONTACT_NAME: "Enter contact name",
  CONTACT_EMAIL: "Enter email address",
  CONTACT_PHONE: "Enter phone number",
  AUTH_NAME: "Enter your full name",
  AUTH_EMAIL: "Enter your email",
  AUTH_PASSWORD: "Enter your password",
  AUTH_CONFIRM_PASSWORD: "Confirm your password",
};
