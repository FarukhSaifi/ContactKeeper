import { useCallback, useState } from "react";
import { handleError } from "../utils/helpers";

// Custom hook for API calls
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall, onSuccess, onError) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      if (onSuccess) {
        onSuccess(result);
      }
      return result;
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setLoading(false);
  }, []);

  return {
    loading,
    error,
    execute,
    reset,
  };
};

// Custom hook for form handling
export const useForm = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback(
    (field, value) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: null }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (field) => {
      setTouched((prev) => ({ ...prev, [field]: true }));

      // Validate field on blur
      if (validationRules && validationRules[field]) {
        const validator = validationRules[field];
        const error =
          typeof validator === "function"
            ? validator(values[field], values)
            : validator.validator(values[field], values);

        if (error) {
          setErrors((prev) => ({ ...prev, [field]: error }));
        }
      }
    },
    [values, validationRules]
  );

  const validate = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    if (validationRules) {
      Object.keys(validationRules).forEach((field) => {
        const validator = validationRules[field];
        const error =
          typeof validator === "function"
            ? validator(values[field], values)
            : validator.validator(values[field], values);

        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      });
    }

    setErrors(newErrors);
    setTouched(
      Object.keys(validationRules || {}).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    return isValid;
  }, [values, validationRules]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFieldValue = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setFieldError = useCallback((field, error) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    setFieldValue,
    setFieldError,
    isValid: Object.keys(errors).length === 0,
  };
};

// Custom hook for local storage
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};
