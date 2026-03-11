import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Logout as LogoutIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import ThemeToggle from "../../Components/Layout/ThemeToggle";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/", requiresAuth: true },
    { text: "About", icon: <InfoIcon />, path: "/about", requiresAuth: true },
    { text: "Login", icon: <LoginIcon />, path: "/login", requiresAuth: false },
    { text: "Register", icon: <PersonAddIcon />, path: "/register", requiresAuth: false },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  const filteredMenuItems = menuItems.filter(
    (item) => !item.requiresAuth || isAuthenticated
  );

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setOpen(true)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: "background.paper",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" component="div">
            Menu
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <List>
          {filteredMenuItems.map((item) => (
            <ListItem
              key={item.path}
              button
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}

          {isAuthenticated && (
            <>
              <Divider sx={{ my: 1 }} />
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          )}
        </List>

        <Divider />

        <Box sx={{ p: 2 }}>
          <ThemeToggle />
        </Box>
      </Drawer>
    </>
  );
};

export default MobileNav;

