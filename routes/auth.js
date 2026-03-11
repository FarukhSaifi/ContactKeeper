/**
 * Auth routes: get current user (protected) and login (public).
 * Uses JWT and bcrypt; tokens are set in constants (JWT.EXPIRES_IN).
 */
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check } = require("express-validator");

const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../modals/User");
const { HTTP_STATUS, MESSAGES, JWT } = require("../config/constants");
const { handleValidationErrors, sendServerError } = require("../utils/routeHelpers");

// Validation rules for POST / (login)
const loginValidation = [
  check("email", "Valid email is required").isEmail().normalizeEmail(),
  check("password", "Password is required").not().isEmpty(),
];

/** Promisified JWT sign; payload should include { user: { id } }. */
function signToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.get("jwtSecret"), { expiresIn: JWT.EXPIRES_IN }, (err, token) =>
      err ? reject(err) : resolve(token),
    );
  });
}

// GET /api/auth – return current user (no password); requires auth middleware
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password").lean();
    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ msg: MESSAGES.INVALID_CREDENTIALS });
    }
    res.json(user);
  } catch (err) {
    sendServerError(res, err, "auth");
  }
});

// POST /api/auth – login with email/password; returns { token }
router.post("/", loginValidation, async (req, res) => {
  if (handleValidationErrors(req, res)) return;

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ msg: MESSAGES.INVALID_CREDENTIALS });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ msg: MESSAGES.INVALID_PASSWORD });
    }

    const token = await signToken({ user: { id: user.id } });
    res.json({ token });
  } catch (err) {
    sendServerError(res, err, "auth");
  }
});

module.exports = router;
