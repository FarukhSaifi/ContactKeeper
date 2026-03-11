import { AppBar, Button, Toolbar, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "../../components/layout/MobileNav";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  flexGrow: 1,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: 600,
  fontSize: "1.25rem",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    opacity: 0.8,
  },
}));

const Navbar = ({ Name = "Contact Keeper" }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <StyledAppBar position="sticky" color="primary">
      <Toolbar>
        {isMobile ? (
          <>
            <MobileNav />
            <StyledTypography variant="h6">{Name}</StyledTypography>
            <ThemeToggle />
          </>
        ) : (
          <>
            <StyledTypography variant="h6">{Name}</StyledTypography>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {isAuthenticated ? (
                <>
                  <Button color="inherit">
                    <StyledLink to="/">Home</StyledLink>
                  </Button>
                  <Button color="inherit">
                    <StyledLink to="/about">About</StyledLink>
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit">
                    <StyledLink to="/login">Login</StyledLink>
                  </Button>
                  <Button color="inherit">
                    <StyledLink to="/register">Register</StyledLink>
                  </Button>
                </>
              )}
              <ThemeToggle />
            </Box>
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
