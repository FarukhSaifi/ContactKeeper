/**
 * User registration route: POST /api/users.
 * Creates user with hashed password and returns JWT (same shape as login).
 */
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check } = require("express-validator");

const router = express.Router();
const User = require("../modals/User");
const { HTTP_STATUS, MESSAGES, JWT } = require("../config/constants");
const { handleValidationErrors, sendServerError } = require("../utils/routeHelpers");

// Validation rules for POST / (register)
const registerValidation = [
  check("name", "Name is required").trim().notEmpty(),
  check("email", "Valid email is required").isEmail().normalizeEmail(),
  check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
];

/** Promisified JWT sign; payload should include { user: { id } }. */
function signToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.get("jwtSecret"), { expiresIn: JWT.EXPIRES_IN }, (err, token) =>
      err ? reject(err) : resolve(token),
    );
  });
}

// POST /api/users – register; returns 201 and { token }
router.post("/", registerValidation, async (req, res) => {
  if (handleValidationErrors(req, res)) return;

  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ msg: MESSAGES.USER_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const token = await signToken({ user: { id: user.id } });
    res.status(201).json({ token });
  } catch (err) {
    sendServerError(res, err, "users");
  }
});

module.exports = router;
