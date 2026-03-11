/**
 * Contact CRUD routes under /api/contacts.
 * All routes except GET/POST / require auth; update/delete enforce ownership via user id.
 */
const express = require("express");
const mongoose = require("mongoose");
const { check } = require("express-validator");

const router = express.Router();
const auth = require("../middleware/auth");
const Contact = require("../modals/Contacts");
const { HTTP_STATUS, MESSAGES, CONTACT_TYPE } = require("../config/constants");
const { handleValidationErrors, sendServerError } = require("../utils/routeHelpers");

// Validation for creating a contact
const createContactValidation = [
  check("name", "Name is required").trim().notEmpty(),
  check("email", "Provide a valid email").optional().isEmail(),
  check("phone", "Phone is required").trim().notEmpty(),
  check("type", "Type must be personal or professional").optional().isIn(CONTACT_TYPE),
];

// Validation for updating (all fields optional but validated when present)
const updateContactValidation = [
  check("name", "Name cannot be empty").optional().trim().notEmpty(),
  check("email", "Provide a valid email").optional().isEmail(),
  check("type", "Type must be personal or professional").optional().isIn(CONTACT_TYPE),
];

/** Returns true only for a valid 24-char hex MongoDB ObjectId. */
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;
}

// GET /api/contacts – list contacts for the authenticated user, newest first
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 }).lean();
    res.json(contacts);
  } catch (err) {
    sendServerError(res, err, "contacts");
  }
});

// POST /api/contacts – create contact; body: name, email?, phone, type?
router.post("/", auth, createContactValidation, async (req, res) => {
  if (handleValidationErrors(req, res)) return;

  const { name, email, phone, type } = req.body;

  try {
    const contact = await Contact.create({
      user: req.user.id,
      name: name.trim(),
      email: email?.trim() || undefined,
      phone: phone?.trim(),
      type: type || CONTACT_TYPE[0],
    });
    res.status(201).json(contact);
  } catch (err) {
    sendServerError(res, err, "contacts");
  }
});

// PUT /api/contacts/:id – update contact (only provided fields); must own contact
router.put("/:id", auth, updateContactValidation, async (req, res) => {
  if (handleValidationErrors(req, res)) return;

  const { name, email, phone, type } = req.body;

  const updates = {};
  if (name !== undefined) updates.name = name.trim();
  if (email !== undefined) updates.email = email.trim();
  if (phone !== undefined) updates.phone = phone.trim();
  if (type !== undefined) updates.type = type;

  if (Object.keys(updates).length === 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ msg: MESSAGES.PROVIDE_FIELD_TO_UPDATE });
  }

  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ msg: MESSAGES.INVALID_CONTACT_ID });
    }

    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: updates },
      { new: true, runValidators: true },
    );

    if (!contact) {
      const exists = await Contact.findById(req.params.id).select("_id").lean();
      return res.status(exists ? HTTP_STATUS.UNAUTHORIZED : HTTP_STATUS.NOT_FOUND).json({
        msg: exists ? MESSAGES.NOT_AUTHORIZED : MESSAGES.CONTACT_NOT_FOUND,
      });
    }

    res.json(contact);
  } catch (err) {
    sendServerError(res, err, "contacts");
  }
});

// DELETE /api/contacts/:id – delete contact; must own contact
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ msg: MESSAGES.INVALID_CONTACT_ID });
    }

    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!contact) {
      const exists = await Contact.findById(req.params.id).select("_id").lean();
      return res.status(exists ? HTTP_STATUS.UNAUTHORIZED : HTTP_STATUS.NOT_FOUND).json({
        msg: exists ? MESSAGES.NOT_AUTHORIZED : MESSAGES.CONTACT_NOT_FOUND,
      });
    }

    res.json({ msg: MESSAGES.CONTACT_REMOVED });
  } catch (err) {
    sendServerError(res, err, "contacts");
  }
});

module.exports = router;
