const mongoose = require("mongoose");
const config = require("config");

const getMongoUri = () => {
  if (process.env.MONGO_URI && process.env.MONGO_URI.trim().length > 0) {
    return process.env.MONGO_URI;
  }
  try {
    return config.get("mongoURI");
  } catch (err) {
    return "mongodb://localhost:27017/contactkeeper";
  }
};

const connectDB = async () => {
  const mongoUri = getMongoUri();
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected...👍🏼");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    console.log("App will continue without database connection...");
  }
};

module.exports = connectDB;
