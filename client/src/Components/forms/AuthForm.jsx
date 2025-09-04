import { Box, Checkbox, FormControlLabel, Link, Typography } from "@mui/material";
import React from "react";
import { useForm } from "../../hooks/useApi";
import { validators } from "../../utils/validation";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Loading from "../ui/Loading";

const AuthForm = ({
  mode = "login", // 'login' or 'register'
  onSubmit,
  loading = false,
  error = null,
  className = "",
}) => {
  const initialValues =
    mode === "login"
      ? { email: "", password: "", remember: false }
      : { name: "", email: "", password: "", confirmPassword: "" };

  const validationRules =
    mode === "login"
      ? {
          email: validators.email,
          password: validators.password,
        }
      : {
          name: validators.name,
          email: validators.email,
          password: validators.password,
          confirmPassword: (value, formData) =>
            validators.confirmPassword(value, formData.password),
        };

  const { values, errors, touched, handleChange, handleBlur, validate } = useForm(
    initialValues,
    validationRules
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate() && onSubmit) {
      const { confirmPassword, ...submitData } = values;
      onSubmit(submitData);
    }
  };

  if (loading) {
    return <Loading message="Processing..." />;
  }

  return (
    <Box className={`space-y-6 ${className}`}>
      <div className="text-center">
        <Typography
          component="h1"
          variant="h4"
          className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
        >
          {mode === "login" ? "Sign in to your account" : "Create your account"}
        </Typography>
        <Typography variant="body1" className="text-gray-600 dark:text-gray-400">
          {mode === "login"
            ? "Welcome back! Please sign in to continue."
            : "Join us today and start managing your contacts."}
        </Typography>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <Input
            label="Full Name"
            name="name"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            error={touched.name && errors.name}
            required
            placeholder="Enter your full name"
          />
        )}

        <Input
          label="Email Address"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          error={touched.email && errors.email}
          required
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={(e) => handleChange("password", e.target.value)}
          onBlur={() => handleBlur("password")}
          error={touched.password && errors.password}
          required
          showPasswordToggle
          placeholder="Enter your password"
        />

        {mode === "register" && (
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            onBlur={() => handleBlur("confirmPassword")}
            error={touched.confirmPassword && errors.confirmPassword}
            required
            showPasswordToggle
            placeholder="Confirm your password"
          />
        )}

        {mode === "login" && (
          <Box className="flex items-center justify-between">
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.remember}
                  onChange={(e) => handleChange("remember", e.target.checked)}
                  color="primary"
                />
              }
              label="Remember me"
              className="text-gray-600 dark:text-gray-300"
            />
            <Link href="#" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Forgot password?
            </Link>
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          {mode === "login" ? "Sign In" : "Create Account"}
        </Button>

        <div className="text-center">
          <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <Link
              href={mode === "login" ? "/register" : "/login"}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </Link>
          </Typography>
        </div>
      </form>
    </Box>
  );
};

export default AuthForm;
