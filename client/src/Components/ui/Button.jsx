import { CircularProgress, Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

// Styled Button component
const StyledButton = styled(MuiButton)(({ theme, variant, size }) => ({
  textTransform: "none",
  fontWeight: 500,
  borderRadius: 8,
  transition: "all 0.3s ease",

  ...(variant === "contained" && {
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    "&:hover": {
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      transform: "translateY(-1px)",
    },
  }),

  ...(variant === "outlined" && {
    borderWidth: 2,
    "&:hover": {
      borderWidth: 2,
      transform: "translateY(-1px)",
    },
  }),

  ...(size === "large" && {
    padding: "12px 24px",
    fontSize: "1rem",
  }),

  ...(size === "small" && {
    padding: "6px 12px",
    fontSize: "0.875rem",
  }),
}));

const Button = ({
  children,
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  fullWidth = false,
  variant = "contained",
  color = "primary",
  size = "medium",
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <StyledButton
      variant={variant}
      color={color}
      size={size}
      disabled={isDisabled}
      fullWidth={fullWidth}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      endIcon={!loading ? endIcon : null}
      onClick={onClick}
      type={type}
      className={`transition-all duration-300 ${className}`}
      {...props}
    >
      {loading ? "Loading..." : children}
    </StyledButton>
  );
};

export default Button;
