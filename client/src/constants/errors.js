export const HOOK_ERRORS = {
  USE_CONTACTS_CONTEXT: "useContacts must be used within a ContactProvider",
  USE_AUTH_CONTEXT: "useAuth must be used within an AuthProvider",
  USE_ALERT_CONTEXT: "useAlert must be used within AlertState",
};

export const ERROR_BOUNDARY = {
  TITLE: "Oops! Something went wrong",
  DESCRIPTION:
    "We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.",
  TRY_AGAIN: "Try Again",
  REFRESH_PAGE: "Refresh Page",
  DEV_DETAILS: "Error Details (Development Only):",
  COMPONENT_STACK: "Component Stack",
};
