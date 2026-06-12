const jwt = require("jsonwebtoken");
const { BEARER_PREFIX, AUTH_TOKEN_HEADER, MESSAGES } = require("../constants");
const { assertJwtSecret } = require("../utils/tokenService");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
  const token =
    authHeader && authHeader.startsWith(BEARER_PREFIX)
      ? authHeader.slice(BEARER_PREFIX.length)
      : req.header(AUTH_TOKEN_HEADER);

  if (!token) {
    return res.status(401).json({ msg: MESSAGES.AUTH.NO_TOKEN });
  }

  try {
    const decoded = jwt.verify(token, assertJwtSecret());
    req.user = decoded.user;
    next();
  } catch (err) {
    if (err.status === 500) {
      return res.status(500).json({ msg: err.message });
    }
    res.status(401).json({ msg: MESSAGES.AUTH.INVALID_TOKEN });
  }
};
