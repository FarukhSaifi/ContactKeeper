/**
 * MongoDB connection setup.
 * Loads URI from env (MONGO_URI) or config, then connects; does not throw on failure.
 */
const mongoose = require("mongoose");
const config = require("config");
const { DEFAULT_MONGO_URI } = require("./constants");

/**
 * Resolves MongoDB connection URI: env first, then config, then default.
 * @returns {string} Connection URI
 */
function getMongoUri() {
  const envUri = process.env.MONGO_URI?.trim();
  if (envUri) return envUri;
  try {
    return config.get("mongoURI");
  } catch {
    return DEFAULT_MONGO_URI;
  }
}

/**
 * Connects to MongoDB using getMongoUri().
 * Logs success or failure; does not throw so the app can start without DB.
 */
async function connectDB() {
  const uri = getMongoUri();
  try {
    await mongoose.connect(uri);
    console.log("[db] MongoDB connected");
  } catch (err) {
    console.error("[db] Connection failed:", err.message);
  }
}

module.exports = connectDB;
