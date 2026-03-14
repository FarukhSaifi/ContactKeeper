import { Container, CssBaseline } from "@mui/material";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AlertState from "./Components/Context/Alerts/AlertState";
import AuthState from "./Components/Context/auth/AuthState";
import ContactState from "./Components/Context/ContactState";
import { ThemeProvider } from "./contexts/ThemeContext";

import ProtectedRoute from "./Components/auth/ProtectedRoute";
import Home from "./Components/Layout/Home";
import Navbar from "./Components/Layout/Navbar";
import About from "./Components/Pages/About";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import ErrorBoundary from "./Components/ui/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <CssBaseline />
        <AuthState>
          <ContactState>
            <AlertState>
              <Router>
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
                      <>
                        <Navbar />
                        <Container maxWidth="lg" className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                          <ProtectedRoute>
                            <About />
                          </ProtectedRoute>
                        </Container>
                      </>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <>
                        <Navbar />
                        <Container maxWidth="sm" className="min-h-screen py-8">
                          <Register />
                        </Container>
                      </>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <>
                        <Navbar />
                        <Container maxWidth="sm" className="min-h-screen py-8">
                          <Login />
                        </Container>
                      </>
                    }
                  />
                </Routes>
              </Router>
            </AlertState>
          </ContactState>
        </AuthState>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
