import { Container, CssBaseline } from "@mui/material";
import React, { Fragment } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Context Providers
import AlertState from "./Components/Context/Alerts/AlertState";
import AuthState from "./Components/Context/auth/AuthState";
import ContactState from "./Components/Context/ContactState";
import { ThemeProvider } from "./contexts/ThemeContext";

// Components
import Home from "./Components/Layout/Home";
import Navbar from "./Components/Layout/Navbar";
import About from "./Components/Pages/About";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";

// Auth Components
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Error Boundary
import ErrorBoundary from "./components/ui/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <CssBaseline />
        <AuthState>
          <ContactState>
            <AlertState>
              <Router>
                <Fragment>
                  <Navbar />
                  <Container
                    maxWidth="lg"
                    className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-8"
                  >
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <ProtectedRoute>
                            <Home />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/about"
                        element={
                          <ProtectedRoute>
                            <About />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="/register" element={<Register />} />
                      <Route path="/login" element={<Login />} />
                    </Routes>
                  </Container>
                </Fragment>
              </Router>
            </AlertState>
          </ContactState>
        </AuthState>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
