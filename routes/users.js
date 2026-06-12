const express = require("express");
const { check, validationResult } = require("express-validator");

const userController = require("../controllers/userController");
const asyncHandler = require("../utils/asyncHandler");
const { PASSWORD_MIN_LENGTH, MESSAGES } = require("../constants");

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  "/",
  [
    check("name", MESSAGES.VALIDATION.NAME_REQUIRED).not().isEmpty().trim(),
    check("email", MESSAGES.VALIDATION.EMAIL_INVALID).isEmail().normalizeEmail(),
    check("password", MESSAGES.VALIDATION.PASSWORD_MIN).isLength({
      min: PASSWORD_MIN_LENGTH,
    }),
  ],
  validate,
  asyncHandler(userController.register),
);

module.exports = router;
