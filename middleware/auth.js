/**
 * JWT auth middleware for protected routes.
 * Reads token from Authorization: Bearer <token> or x-auth-token, verifies it, sets req.user.
 */
const jwt = require("jsonwebtoken");
const config = require("config");
const { HTTP_STATUS, MESSAGES } = require("../config/constants");

/**
 * Middleware: require valid JWT and attach decoded user to req.user.
 * Sends 401 with message if missing or invalid token.
 */
function auth(req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : req.header("x-auth-token");

  if (!token) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ msg: MESSAGES.NO_TOKEN });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ msg: MESSAGES.INVALID_TOKEN });
  }
}

module.exports = auth;
