import { APP_CONFIG } from "./app";

export const NAV_LABELS = {
  HOME: "Home",
  ABOUT: "About",
  LOGIN: "Login",
  REGISTER: "Register",
  LOGOUT: "Logout",
};

export const PAGE_LABELS = {
  APP_NAME: APP_CONFIG.NAME,
  APP_TAGLINE: "Manage your contacts efficiently",
  SEARCH_CONTACTS: "Search Contacts",
  YOUR_CONTACTS: "Your Contacts",
  NO_CONTACTS_TITLE: "No contacts found",
  NO_CONTACTS_BODY: "Add your first contact to get started",
  CONTACT_COUNT: (count) => `${count} contact(s)`,
  ABOUT_TITLE: `About ${APP_CONFIG.NAME}`,
  ABOUT_WELCOME: `Welcome to ${APP_CONFIG.NAME}`,
  ABOUT_DESCRIPTION: `${APP_CONFIG.NAME} is a modern, intuitive contact management application built with React, Material UI, and Node.js.`,
};

export const FORM_LABELS = {
  SEARCH_CONTACT: "Search Contact",
  ADD_CONTACT: "Add Contact",
  EDIT_CONTACT: "Edit Contact",
  UPDATE_CONTACT: "Update Contact",
  CANCEL: "Cancel",
  PROCESSING: "Processing...",
  SIGN_IN: "Sign In",
  CREATE_ACCOUNT: "Create Account",
  SIGN_IN_TITLE: "Sign in to your account",
  CREATE_ACCOUNT_TITLE: "Create your account",
  SIGN_IN_SUBTITLE: "Welcome back! Please sign in to continue.",
  REGISTER_SUBTITLE: "Join us today and start managing your contacts.",
  REMEMBER_ME: "Remember me",
  FORGOT_PASSWORD: "Forgot password?",
  NO_ACCOUNT: "Don't have an account? ",
  HAS_ACCOUNT: "Already have an account? ",
  SIGN_UP: "Sign up",
  SIGN_IN_LINK: "Sign in",
};

export const LOADING_LABELS = {
  AUTH: "Checking authentication...",
  PAGE: "Loading page...",
};

export const ABOUT_LABELS = {
  FEATURES_TITLE: "Features",
  TECH_STACK_TITLE: "Technology Stack",
  FEATURES: [
    "Add, edit, and delete contacts",
    "Search and filter contacts",
    "Dark and light theme support",
    "Responsive design for all devices",
    "Modern Material-UI components",
    "Tailwind CSS for enhanced styling",
  ],
  TECH_STACK: ["React 18", "Material-UI v6", "Tailwind CSS", "Vite", "React Router v6", "Node.js"],
  FULL_DESCRIPTION:
    "ContactKeeper is a modern, intuitive contact management application built with React, Material-UI, and Tailwind CSS. It provides a seamless experience for managing your personal and professional contacts with a beautiful, responsive interface.",
};
