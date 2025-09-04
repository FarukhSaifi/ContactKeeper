import { CardActions, CardContent, CardHeader, Card as MuiCard } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

// Styled Card component
const StyledCard = styled(MuiCard)(({ theme, variant = "elevation" }) => ({
  borderRadius: 12,
  transition: "all 0.3s ease",

  ...(variant === "elevation" && {
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    "&:hover": {
      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      transform: "translateY(-2px)",
    },
  }),

  ...(variant === "outlined" && {
    border: `1px solid ${theme.palette.divider}`,
    "&:hover": {
      borderColor: theme.palette.primary.main,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
  }),
}));

const Card = ({
  children,
  title,
  subtitle,
  actions,
  variant = "elevation",
  className = "",
  onClick,
  ...props
}) => {
  return (
    <StyledCard
      variant={variant}
      className={`cursor-pointer ${onClick ? "hover:shadow-lg" : ""} ${className}`}
      onClick={onClick}
      {...props}
    >
      {title && (
        <CardHeader
          title={title}
          subheader={subtitle}
          titleTypographyProps={{
            variant: "h6",
            fontWeight: 600,
          }}
          subheaderTypographyProps={{
            variant: "body2",
            color: "text.secondary",
          }}
        />
      )}

      <CardContent>{children}</CardContent>

      {actions && <CardActions>{actions}</CardActions>}
    </StyledCard>
  );
};

export default Card;
