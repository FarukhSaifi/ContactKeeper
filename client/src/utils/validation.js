import { VALIDATION_RULES } from "../constants/app";

// Validation utility functions
export const validators = {
  // Name validation
  name: (value) => {
    if (!value || value.trim().length === 0) {
      return "Name is required";
    }
    if (value.length < VALIDATION_RULES.NAME.MIN_LENGTH) {
      return `Name must be at least ${VALIDATION_RULES.NAME.MIN_LENGTH} characters`;
    }
    if (value.length > VALIDATION_RULES.NAME.MAX_LENGTH) {
      return `Name must be less than ${VALIDATION_RULES.NAME.MAX_LENGTH} characters`;
    }
    return null;
  },

  // Email validation
  email: (value) => {
    if (!value || value.trim().length === 0) {
      return "Email is required";
    }
    if (!VALIDATION_RULES.EMAIL.PATTERN.test(value)) {
      return "Please enter a valid email address";
    }
    return null;
  },

  // Password validation
  password: (value) => {
    if (!value || value.length === 0) {
      return "Password is required";
    }
    if (value.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
      return `Password must be at least ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters`;
    }
    if (value.length > VALIDATION_RULES.PASSWORD.MAX_LENGTH) {
      return `Password must be less than ${VALIDATION_RULES.PASSWORD.MAX_LENGTH} characters`;
    }
    return null;
  },

  // Phone validation
  phone: (value) => {
    if (!value || value.trim().length === 0) {
      return "Phone number is required";
    }
    if (!VALIDATION_RULES.PHONE.PATTERN.test(value.replace(/\s/g, ""))) {
      return "Please enter a valid phone number";
    }
    return null;
  },

  // Confirm password validation
  confirmPassword: (value, originalPassword) => {
    if (!value || value.length === 0) {
      return "Please confirm your password";
    }
    if (value !== originalPassword) {
      return "Passwords do not match";
    }
    return null;
  },
};

// Form validation helper
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

// Sanitize input
export const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;
  return input.trim().replace(/[<>]/g, "");
};

// Format phone number
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};
