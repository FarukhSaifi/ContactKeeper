import { BrowserRouter as Router } from "react-router-dom";

import AppShell from "@/app/AppShell";
import AppRoutes from "@/app/Routes";
import AlertState from "@/components/Context/Alerts/AlertState";
import AuthState from "@/components/Context/auth/AuthState";
import ContactState from "@/components/Context/ContactState";
import Alert from "@/components/Layout/Alert";
import Navbar from "@/components/Layout/Navbar";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AlertState>
          <AuthState>
            <ContactState>
              <Router>
                <Navbar />
                <Alert />
                <AppShell>
                  <AppRoutes />
                </AppShell>
              </Router>
            </ContactState>
          </AuthState>
        </AlertState>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
