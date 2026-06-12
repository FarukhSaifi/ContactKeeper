const jwt = require("jsonwebtoken");
const config = require("../config");
const { MESSAGES } = require("../constants");

const assertJwtSecret = () => {
  if (!config.jwtSecret) {
    const error = new Error(MESSAGES.AUTH.JWT_SECRET_MISSING);
    error.status = 500;
    throw error;
  }
  return config.jwtSecret;
};

const signToken = (userId) =>
  jwt.sign({ user: { id: userId } }, assertJwtSecret(), {
    expiresIn: config.jwtExpiresIn,
  });

module.exports = { signToken, assertJwtSecret };
