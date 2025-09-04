import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

// Styled TextField component
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    transition: "all 0.3s ease",

    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },

    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },

  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,

    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
}));

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  placeholder,
  startAdornment,
  endAdornment,
  showPasswordToggle = false,
  multiline = false,
  rows = 1,
  maxRows,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = (e) => {
    setFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  const passwordToggle =
    showPasswordToggle && type === "password" ? (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handlePasswordToggle}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ) : null;

  return (
    <StyledTextField
      label={label}
      type={inputType}
      value={value}
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      error={!!error}
      helperText={error || helperText}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      placeholder={placeholder}
      multiline={multiline}
      rows={rows}
      maxRows={maxRows}
      variant="outlined"
      margin="normal"
      className={`transition-all duration-300 ${className}`}
      InputProps={{
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : null,
        endAdornment: endAdornment || passwordToggle,
      }}
      {...props}
    />
  );
};

export default Input;
