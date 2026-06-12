const mongoose = require("mongoose");
const config = require("./index");

const connectDB = async () => {
  if (!config.mongoUri) {
    console.error("MongoDB connection failed: MONGO_URI is not configured");
    process.exit(1);
  }

  try {
    await mongoose.connect(config.mongoUri);
    console.log("MongoDB Connected...👍🏼");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
