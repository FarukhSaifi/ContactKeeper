const express = require("express");
const { check, validationResult } = require("express-validator");

const contactController = require("../controllers/contactController");
const auth = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const { CONTACT_TYPES, MESSAGES } = require("../constants");

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get("/", auth, asyncHandler(contactController.getContacts));

router.post(
  "/",
  auth,
  [
    check("name", MESSAGES.VALIDATION.NAME_REQUIRED).not().isEmpty().trim(),
    check("phone", MESSAGES.VALIDATION.PHONE_REQUIRED).not().isEmpty().trim(),
    check("email", MESSAGES.VALIDATION.EMAIL_INVALID).optional().isEmail(),
    check("type").optional().isIn(CONTACT_TYPES),
  ],
  validate,
  asyncHandler(contactController.createContact),
);

router.put("/:id", auth, asyncHandler(contactController.updateContact));

router.delete("/:id", auth, asyncHandler(contactController.deleteContact));

module.exports = router;
