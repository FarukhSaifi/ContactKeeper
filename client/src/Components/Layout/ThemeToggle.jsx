import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Tooltip title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        className="transition-all duration-300 hover:scale-110"
        sx={{
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        {isDarkMode ? (
          <LightMode className="text-yellow-400" />
        ) : (
          <DarkMode className="text-gray-700" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
