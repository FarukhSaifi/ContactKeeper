import { AUTH_FORM_MODES, FORM_PLACEHOLDERS, LOGIN_FORM_INITIAL, REGISTER_FORM_INITIAL } from "@/constants/forms";
import { FORM_LABELS } from "@/constants/labels";
import { ROUTES } from "@/constants/routes";
import { useForm } from "@/hooks/useApi";
import { validators } from "@/utils/validation";
import { Box, Checkbox, FormControlLabel, Link, Typography } from "@mui/material";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Loading from "../ui/Loading";

const AuthForm = ({ mode = AUTH_FORM_MODES.LOGIN, onSubmit, loading = false, error = null, className = "" }) => {
  const isLogin = mode === AUTH_FORM_MODES.LOGIN;
  const initialValues = isLogin ? LOGIN_FORM_INITIAL : REGISTER_FORM_INITIAL;

  const validationRules = isLogin
    ? {
        email: validators.email,
        password: validators.password,
      }
    : {
        name: validators.name,
        email: validators.email,
        password: validators.password,
        confirmPassword: (value, formData) => validators.confirmPassword(value, formData.password),
      };

  const { values, errors, touched, handleChange, handleBlur, validate } = useForm(initialValues, validationRules);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      const { confirmPassword, ...submitData } = values;
      onSubmit(submitData);
    }
  };

  if (loading) {
    return <Loading message={FORM_LABELS.PROCESSING} />;
  }

  return (
    <Box className={`space-y-6 ${className}`}>
      <div className="text-center">
        <Typography component="h1" variant="h4" className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {isLogin ? FORM_LABELS.SIGN_IN_TITLE : FORM_LABELS.CREATE_ACCOUNT_TITLE}
        </Typography>
        <Typography variant="body1" className="text-gray-600 dark:text-gray-400">
          {isLogin ? FORM_LABELS.SIGN_IN_SUBTITLE : FORM_LABELS.REGISTER_SUBTITLE}
        </Typography>
      </div>

      {error ? <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div> : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin ? (
          <Input
            label="Full Name"
            name="name"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            error={touched.name && errors.name}
            required
            placeholder={FORM_PLACEHOLDERS.AUTH_NAME}
          />
        ) : null}

        <Input
          label="Email Address"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          error={touched.email && errors.email}
          required
          placeholder={FORM_PLACEHOLDERS.AUTH_EMAIL}
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
          placeholder={FORM_PLACEHOLDERS.AUTH_PASSWORD}
        />

        {!isLogin ? (
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
            placeholder={FORM_PLACEHOLDERS.AUTH_CONFIRM_PASSWORD}
          />
        ) : null}

        {isLogin ? (
          <Box className="flex items-center justify-between">
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.remember}
                  onChange={(e) => handleChange("remember", e.target.checked)}
                  color="primary"
                />
              }
              label={FORM_LABELS.REMEMBER_ME}
              className="text-gray-600 dark:text-gray-300"
            />
            <Link href="#" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
              {FORM_LABELS.FORGOT_PASSWORD}
            </Link>
          </Box>
        ) : null}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          {isLogin ? FORM_LABELS.SIGN_IN : FORM_LABELS.CREATE_ACCOUNT}
        </Button>

        <div className="text-center">
          <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
            {isLogin ? FORM_LABELS.NO_ACCOUNT : FORM_LABELS.HAS_ACCOUNT}
            <Link
              href={isLogin ? ROUTES.REGISTER : ROUTES.LOGIN}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
            >
              {isLogin ? FORM_LABELS.SIGN_UP : FORM_LABELS.SIGN_IN_LINK}
            </Link>
          </Typography>
        </div>
      </form>
    </Box>
  );
};

export default AuthForm;
