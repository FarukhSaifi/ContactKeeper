/**
 * Contact Keeper – Express app entry point.
 * Sets up DB, JSON middleware, API routes, optional static client, and error handler.
 */
const express = require("express");
const path = require("path");

require("dotenv").config();

const connectDB = require("./config/db");
const { MESSAGES, DEFAULT_PORT, WELCOME_MSG } = require("./config/constants");

const app = express();

const PORT = process.env.PORT || DEFAULT_PORT;
const IS_PRODUCTION = process.env.NODE_ENV === "production";

// Connect to MongoDB (non-blocking; app starts either way)
connectDB();

// Parse JSON request bodies
app.use(express.json({ extended: false }));

app.get("/", (_req, res) => {
  res.json({ msg: WELCOME_MSG });
});

// API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));

// 404 for any other /api/* path
app.use("/api", (_req, res) => {
  res.status(404).json({ error: MESSAGES.API_ROUTE_NOT_FOUND });
});

// Production: serve built React app and SPA fallback
if (IS_PRODUCTION) {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Global error handler (must be last)
app.use((err, _req, res, _next) => {
  console.error("[server]", err.stack);
  res.status(500).json({ error: MESSAGES.SERVER_ERROR });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
