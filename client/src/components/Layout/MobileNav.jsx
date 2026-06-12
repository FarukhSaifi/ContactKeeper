import { NAV_LABELS } from "@/constants/labels";
import { NAV_MENU_ITEMS } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { Close as CloseIcon, Logout as LogoutIcon, Menu as MenuIcon } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
    setOpen(false);
  };

  const filteredMenuItems = NAV_MENU_ITEMS.filter((item) => !item.requiresAuth || isAuthenticated);

  return (
    <>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, pt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Menu
            </Typography>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <ThemeToggle />
              <IconButton onClick={() => setOpen(false)} aria-label="close menu">
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          <Divider />

          <List>
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <ListItem
                  key={item.path}
                  button
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    backgroundColor: isActive ? "action.selected" : "transparent",
                  }}
                >
                  <ListItemIcon>
                    <Icon color={isActive ? "primary" : "inherit"} />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              );
            })}

            {isAuthenticated ? (
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={NAV_LABELS.LOGOUT} />
              </ListItem>
            ) : null}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileNav;
