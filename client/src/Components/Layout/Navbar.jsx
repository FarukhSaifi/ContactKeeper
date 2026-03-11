import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";
import { APP_CONFIG, ROUTES } from "../../constants/app";
import ThemeToggle from "./ThemeToggle";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  flexGrow: 1,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
}));

const Navbar = ({ Name = APP_CONFIG.NAME }) => {
  return (
    <div>
      <StyledAppBar position="static">
        <Toolbar>
          <StyledIconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </StyledIconButton>
          <StyledTypography variant="h6">{Name}</StyledTypography>
          <Button color="inherit">
            <Link to={ROUTES.HOME}>Home</Link>
          </Button>
          <Button color="inherit">
            <Link to={ROUTES.ABOUT}>About</Link>
          </Button>
          <Button color="inherit">
            <Link to={ROUTES.LOGIN}>Login</Link>
          </Button>
          <Button color="inherit">
            <Link to={ROUTES.REGISTER}>Register</Link>
          </Button>
          <ThemeToggle />
        </Toolbar>
      </StyledAppBar>
    </div>
  );
};

export default Navbar;
