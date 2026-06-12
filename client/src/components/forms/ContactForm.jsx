import { CONTACT_TYPES } from "@/constants/app";
import { EMPTY_CONTACT, FORM_PLACEHOLDERS } from "@/constants/forms";
import { FORM_LABELS } from "@/constants/labels";
import { useForm } from "@/hooks/useApi";
import { validators } from "@/utils/validation";
import { Box, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Loading from "../ui/Loading";

const ContactForm = ({
  initialValues = EMPTY_CONTACT,
  onSubmit,
  loading = false,
  error = null,
  submitText = FORM_LABELS.ADD_CONTACT,
  cancelText = FORM_LABELS.CANCEL,
  showCancel = false,
  onCancel,
  className = "",
}) => {
  const { values, errors, touched, handleChange, handleBlur, validate, reset, setFieldValue } = useForm(initialValues, {
    name: validators.name,
    email: validators.email,
    phone: validators.phone,
  });

  useEffect(() => {
    if (initialValues) {
      Object.keys(initialValues).forEach((key) => {
        setFieldValue(key, initialValues[key]);
      });
    }
  }, [initialValues, setFieldValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      onSubmit(values);
    }
  };

  const handleCancel = () => {
    reset();
    if (onCancel) {
      onCancel();
    }
  };

  if (loading) {
    return <Loading message={FORM_LABELS.PROCESSING} />;
  }

  return (
    <Box className={`space-y-6 ${className}`}>
      <div className="text-center">
        <Typography component="h1" variant="h5" className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {initialValues._id ? FORM_LABELS.EDIT_CONTACT : FORM_LABELS.ADD_CONTACT}
        </Typography>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
      </div>

      {error ? <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div> : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Input
              label="Name"
              name="name"
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              error={touched.name && errors.name}
              required
              placeholder={FORM_PLACEHOLDERS.CONTACT_NAME}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Input
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              error={touched.email && errors.email}
              required
              placeholder={FORM_PLACEHOLDERS.CONTACT_EMAIL}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              error={touched.phone && errors.phone}
              required
              placeholder={FORM_PLACEHOLDERS.CONTACT_PHONE}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" className="mb-2 font-medium">
              Contact Type
            </Typography>
            <RadioGroup
              value={values.type}
              onChange={(e) => handleChange("type", e.target.value)}
              row
              className="space-x-4"
            >
              {Object.entries(CONTACT_TYPES).map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  value={value}
                  control={<Radio />}
                  label={value.charAt(0).toUpperCase() + value.slice(1)}
                  className="capitalize"
                />
              ))}
            </RadioGroup>
          </Grid>
        </Grid>

        <Box className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            {submitText}
          </Button>

          {showCancel ? (
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              size="large"
              fullWidth
              onClick={handleCancel}
              disabled={loading}
            >
              {cancelText}
            </Button>
          ) : null}
        </Box>
      </form>
    </Box>
  );
};

export default ContactForm;
