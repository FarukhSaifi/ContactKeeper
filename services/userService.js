const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { signToken } = require("../utils/tokenService");
const { BCRYPT_SALT_ROUNDS, MESSAGES } = require("../constants");

const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error(MESSAGES.AUTH.USER_EXISTS);
    error.status = 400;
    throw error;
  }

  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return { token: signToken(user.id) };
};

module.exports = { register };
