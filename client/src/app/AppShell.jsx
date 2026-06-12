import { ROUTES } from "@/constants/routes";
import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";

const AUTH_ROUTES = new Set([ROUTES.LOGIN, ROUTES.REGISTER]);

const AppShell = ({ children }) => {
  const { pathname } = useLocation();
  const isAuthPage = AUTH_ROUTES.has(pathname);

  if (isAuthPage) {
    return (
      <Container maxWidth="sm" disableGutters className="flex min-h-[calc(100dvh-64px)] items-center px-4 py-6 sm:px-6">
        {children}
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      className="min-h-[calc(100dvh-64px)] bg-gray-50 px-2 py-4 transition-colors duration-300 dark:bg-gray-900 sm:px-4 md:py-8"
    >
      {children}
    </Container>
  );
};

export default AppShell;
