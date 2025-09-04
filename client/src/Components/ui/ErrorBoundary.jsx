import { ErrorOutline, Refresh } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console or error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" className="py-16">
          <Box className="text-center space-y-6">
            <ErrorOutline
              sx={{
                fontSize: 80,
                color: "error.main",
                margin: "0 auto",
              }}
            />

            <Typography variant="h4" component="h1" className="text-gray-900 dark:text-white">
              Oops! Something went wrong
            </Typography>

            <Typography
              variant="body1"
              className="text-gray-600 dark:text-gray-400 max-w-md mx-auto"
            >
              We're sorry, but something unexpected happened. Please try refreshing the page or
              contact support if the problem persists.
            </Typography>

            <Box className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Refresh />}
                onClick={this.handleRetry}
                size="large"
              >
                Try Again
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => window.location.reload()}
                size="large"
              >
                Refresh Page
              </Button>
            </Box>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <Box className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
                <Typography variant="h6" color="error" className="mb-2">
                  Error Details (Development Only):
                </Typography>
                <Typography variant="body2" className="font-mono text-sm">
                  {this.state.error.toString()}
                </Typography>
                {this.state.errorInfo && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm font-medium">
                      Component Stack
                    </summary>
                    <pre className="mt-2 text-xs overflow-auto">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </Box>
            )}
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
