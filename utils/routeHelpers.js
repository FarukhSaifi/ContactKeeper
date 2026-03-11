/**
 * Shared helpers for route handlers.
 * Used by auth, users, and contacts routes for validation and error responses.
 */
const { validationResult } = require("express-validator");
const { HTTP_STATUS, MESSAGES } = require("../config/constants");

/**
 * Runs express-validator and sends 400 with error array if validation failed.
 * @param {import('express').Request} req - Request (must have been through validation middleware)
 * @param {import('express').Response} res - Response object
 * @returns {boolean} true if validation failed (response already sent); false if valid
 */
function handleValidationErrors(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errors.array() });
    return true;
  }
  return false;
}

/**
 * Sends 500 and a generic message, and logs the error with an optional prefix.
 * @param {import('express').Response} res - Response object
 * @param {Error} err - Caught error
 * @param {string} [logPrefix='app'] - Prefix for log line (e.g. "auth", "users", "contacts")
 */
function sendServerError(res, err, logPrefix = "app") {
  console.error(`[${logPrefix}]`, err.message || err);
  res.status(HTTP_STATUS.INTERNAL_ERROR).json({ msg: MESSAGES.SERVER_ERROR });
}

module.exports = {
  handleValidationErrors,
  sendServerError,
};
