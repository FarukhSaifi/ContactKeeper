import { VALIDATION_RULES } from "./app";

export const VALIDATION_MESSAGES = {
  NAME_REQUIRED: "Name is required",
  NAME_MIN: `Name must be at least ${VALIDATION_RULES.NAME.MIN_LENGTH} characters`,
  NAME_MAX: `Name must be less than ${VALIDATION_RULES.NAME.MAX_LENGTH} characters`,
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Please enter a valid email address",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN: `Password must be at least ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters`,
  PASSWORD_MAX: `Password must be less than ${VALIDATION_RULES.PASSWORD.MAX_LENGTH} characters`,
  PHONE_REQUIRED: "Phone number is required",
  PHONE_INVALID: "Please enter a valid phone number",
  CONFIRM_PASSWORD_REQUIRED: "Please confirm your password",
  PASSWORDS_MISMATCH: "Passwords do not match",
};
