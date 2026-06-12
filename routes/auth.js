const express = require("express");
const { check, validationResult } = require("express-validator");

const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const { MESSAGES } = require("../constants");

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get("/", auth, asyncHandler(authController.getCurrentUser));

router.post(
  "/",
  [
    check("email", MESSAGES.VALIDATION.EMAIL_INVALID).isEmail(),
    check("password", MESSAGES.VALIDATION.PASSWORD_REQUIRED).exists(),
  ],
  validate,
  asyncHandler(authController.login),
);

module.exports = router;
