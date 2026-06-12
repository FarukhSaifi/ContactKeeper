require("dotenv").config();

const getEnv = (key, fallback) => {
  const value = process.env[key];
  if (value !== undefined && value.trim() !== "") {
    return value;
  }
  return fallback;
};

const config = {
  nodeEnv: getEnv("NODE_ENV", "development"),
  port: Number(getEnv("PORT", "5001")),
  mongoUri: getEnv("MONGO_URI", ""),
  jwtSecret: getEnv("JWT_SECRET", ""),
  jwtExpiresIn: getEnv("JWT_EXPIRES_IN", "7d"),
  clientUrl: getEnv("CLIENT_URL", "http://localhost:3000"),
};

if (!config.mongoUri) {
  try {
    const legacy = require("config");
    config.mongoUri = legacy.get("mongoURI");
    config.jwtSecret = config.jwtSecret || legacy.get("jwtSecret");
  } catch {
    // config package optional when .env is set
  }
}

if (!config.mongoUri) {
  console.warn("Warning: MONGO_URI is not set. Copy .env.example to .env");
}

if (!config.jwtSecret) {
  console.error("Fatal: JWT_SECRET is not set. Copy .env.example to .env");
  process.exit(1);
}

module.exports = config;
