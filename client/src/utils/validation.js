import { VALIDATION_RULES } from "@/constants/app";
import { VALIDATION_MESSAGES } from "@/constants/validation";

export const validators = {
  name: (value) => {
    if (!value || value.trim().length === 0) {
      return VALIDATION_MESSAGES.NAME_REQUIRED;
    }
    if (value.length < VALIDATION_RULES.NAME.MIN_LENGTH) {
      return VALIDATION_MESSAGES.NAME_MIN;
    }
    if (value.length > VALIDATION_RULES.NAME.MAX_LENGTH) {
      return VALIDATION_MESSAGES.NAME_MAX;
    }
    return null;
  },

  email: (value) => {
    if (!value || value.trim().length === 0) {
      return VALIDATION_MESSAGES.EMAIL_REQUIRED;
    }
    if (!VALIDATION_RULES.EMAIL.PATTERN.test(value)) {
      return VALIDATION_MESSAGES.EMAIL_INVALID;
    }
    return null;
  },

  password: (value) => {
    if (!value || value.length === 0) {
      return VALIDATION_MESSAGES.PASSWORD_REQUIRED;
    }
    if (value.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
      return VALIDATION_MESSAGES.PASSWORD_MIN;
    }
    if (value.length > VALIDATION_RULES.PASSWORD.MAX_LENGTH) {
      return VALIDATION_MESSAGES.PASSWORD_MAX;
    }
    return null;
  },

  phone: (value) => {
    if (!value || value.trim().length === 0) {
      return VALIDATION_MESSAGES.PHONE_REQUIRED;
    }
    if (!VALIDATION_RULES.PHONE.PATTERN.test(value.replace(/\s/g, ""))) {
      return VALIDATION_MESSAGES.PHONE_INVALID;
    }
    return null;
  },

  confirmPassword: (value, originalPassword) => {
    if (!value || value.length === 0) {
      return VALIDATION_MESSAGES.CONFIRM_PASSWORD_REQUIRED;
    }
    if (value !== originalPassword) {
      return VALIDATION_MESSAGES.PASSWORDS_MISMATCH;
    }
    return null;
  },
};

export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = formData[field];

    if (typeof rule === "function") {
      const error = rule(value, formData);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    } else if (typeof rule === "object" && rule.validator) {
      const error = rule.validator(value, formData);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    }
  });

  return { errors, isValid };
};

export const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;
  return input.trim().replace(/[<>]/g, "");
};

export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};
