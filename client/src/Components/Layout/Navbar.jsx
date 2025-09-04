import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";
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

const Navbar = ({ Name = "Contact Keeper" }) => {
  return (
    <div>
      <StyledAppBar position="static">
        <Toolbar>
          <StyledIconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </StyledIconButton>
          <StyledTypography variant="h6">{Name}</StyledTypography>
          <Button color="inherit">
            <Link to="/">Home</Link>
          </Button>
          <Button color="inherit">
            <Link to="/About">About</Link>
          </Button>
          <Button color="inherit">
            <Link to="/Login">Login</Link>
          </Button>
          <Button color="inherit">
            <Link to="/Register">Register</Link>
          </Button>
          <ThemeToggle />
        </Toolbar>
      </StyledAppBar>
    </div>
  );
};

export default Navbar;
