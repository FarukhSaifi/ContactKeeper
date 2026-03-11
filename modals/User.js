/**
 * User model for auth and registration.
 * Passwords are stored hashed (bcrypt) by the routes; this schema does not hash.
 */
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: String, default: Date.now },
});

module.exports = mongoose.model("user", UserSchema);
