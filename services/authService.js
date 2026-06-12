const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { signToken } = require("../utils/tokenService");
const { MESSAGES } = require("../constants");

const findUserByEmail = (email) => User.findOne({ email });

const findUserById = (id) => User.findById(id).select("-password");

const login = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    const error = new Error(MESSAGES.AUTH.INVALID_CREDENTIALS);
    error.status = 400;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error(MESSAGES.AUTH.INVALID_CREDENTIALS);
    error.status = 400;
    throw error;
  }

  return { token: signToken(user.id) };
};

module.exports = {
  findUserByEmail,
  findUserById,
  login,
};
