const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const config = require("./config");
const connectDB = require("./config/db");
const { JSON_BODY_LIMIT, PATHS, RATE_LIMIT, MESSAGES } = require("./constants");

const app = express();

connectDB();

app.use(helmet());
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  }),
);
app.use(express.json({ limit: JSON_BODY_LIMIT }));

const apiLimiter = rateLimit({
  windowMs: RATE_LIMIT.WINDOW_MS,
  max: RATE_LIMIT.API_MAX,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: RATE_LIMIT.WINDOW_MS,
  max: RATE_LIMIT.AUTH_MAX,
  message: { msg: MESSAGES.AUTH.RATE_LIMIT },
});

app.use(PATHS.API_BASE, apiLimiter);
app.use(PATHS.API_AUTH, authLimiter);
app.use(PATHS.API_USERS, authLimiter);

app.get("/", (req, res) => res.json({ msg: MESSAGES.WELCOME }));

app.use(PATHS.API_AUTH, require("./routes/auth"));
app.use(PATHS.API_USERS, require("./routes/users"));
app.use(PATHS.API_CONTACTS, require("./routes/contacts"));

app.use("/api", (req, res) => {
  return res.status(404).json({ error: MESSAGES.API_NOT_FOUND });
});

if (config.nodeEnv === "production") {
  app.use(express.static(PATHS.CLIENT_BUILD));
  app.get("*", (req, res) => {
    return res.sendFile(path.resolve(__dirname, PATHS.CLIENT_BUILD, "index.html"));
  });
}

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack || err.message);
  const status = err.status || 500;
  const msg = status === 500 && config.nodeEnv === "production" ? MESSAGES.SERVER_ERROR : err.message;
  res.status(status).json({ msg });
});

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
