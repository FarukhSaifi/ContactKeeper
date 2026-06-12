import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

// Styled Loading components
const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
}));

const LoadingSpinner = styled(CircularProgress)(({ theme, size = "large" }) => ({
  ...(size === "small" && {
    width: 20,
    height: 20,
  }),
  ...(size === "medium" && {
    width: 40,
    height: 40,
  }),
  ...(size === "large" && {
    width: 60,
    height: 60,
  }),
}));

// Loading component variants
export const Loading = ({
  message = "Loading...",
  size = "medium",
  fullScreen = false,
  overlay = false,
  className = "",
}) => {
  const content = (
    <LoadingContainer className={className}>
      <LoadingSpinner size={size} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </LoadingContainer>
  );

  if (overlay) {
    return (
      <Backdrop
        open={true}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        {content}
      </Backdrop>
    );
  }

  if (fullScreen) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          zIndex: 9999,
        }}
      >
        {content}
      </Box>
    );
  }

  return content;
};

// Skeleton loading component
export const Skeleton = ({ width = "100%", height = 20, className = "" }) => (
  <Box
    className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    sx={{
      width,
      height,
    }}
  />
);

// Loading states for different components
export const LoadingStates = {
  // Button loading
  Button: ({ loading, children, ...props }) => <LoadingSpinner size="small" {...props} />,

  // Card loading
  Card: ({ rows = 3, className = "" }) => (
    <Box className={`space-y-3 ${className}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} height={16} />
      ))}
    </Box>
  ),

  // Table loading
  Table: ({ rows = 5, columns = 4, className = "" }) => (
    <Box className={`space-y-2 ${className}`}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Box key={rowIndex} className="flex space-x-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} height={20} width="25%" />
          ))}
        </Box>
      ))}
    </Box>
  ),
};

export default Loading;
