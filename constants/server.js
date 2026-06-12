module.exports = {
  JSON_BODY_LIMIT: "10kb",
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000,
    API_MAX: 100,
    AUTH_MAX: 20,
  },
  PATHS: {
    API_AUTH: "/api/auth",
    API_USERS: "/api/users",
    API_CONTACTS: "/api/contacts",
    API_BASE: "/api/",
    CLIENT_BUILD: "client/build",
  },
};
