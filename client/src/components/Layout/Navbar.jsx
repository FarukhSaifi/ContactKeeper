import { NAV_LABELS, PAGE_LABELS } from "@/constants/labels";
import { ROUTES } from "@/constants/routes";
import { UI_CONFIG } from "@/constants/ui";
import { useAuth } from "@/hooks/useAuth";
import { AppBar, Box, Button, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";

const StyledAppBar = styled(AppBar)({
  flexGrow: 1,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
});

const StyledTypography = styled(Typography)({
  flexGrow: 1,
  fontWeight: 600,
  fontSize: "1.25rem",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    opacity: 0.8,
  },
});

const Navbar = ({ name = PAGE_LABELS.APP_NAME }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(UI_CONFIG.BREAKPOINTS.MOBILE));
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <StyledAppBar position="sticky" color="primary">
      <Toolbar>
        {isMobile ? (
          <>
            <MobileNav />
            <StyledTypography variant="h6">{name}</StyledTypography>
            <ThemeToggle />
          </>
        ) : (
          <>
            <StyledTypography variant="h6">{name}</StyledTypography>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {isAuthenticated ? (
                <>
                  <Button color="inherit">
                    <StyledLink to={ROUTES.HOME}>{NAV_LABELS.HOME}</StyledLink>
                  </Button>
                  <Button color="inherit">
                    <StyledLink to={ROUTES.ABOUT}>{NAV_LABELS.ABOUT}</StyledLink>
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    {NAV_LABELS.LOGOUT}
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit">
                    <StyledLink to={ROUTES.LOGIN}>{NAV_LABELS.LOGIN}</StyledLink>
                  </Button>
                  <Button color="inherit">
                    <StyledLink to={ROUTES.REGISTER}>{NAV_LABELS.REGISTER}</StyledLink>
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
