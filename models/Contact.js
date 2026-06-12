const mongoose = require("mongoose");
const { CONTACT_TYPES, DEFAULT_CONTACT_TYPE } = require("../constants");

const ContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    default: DEFAULT_CONTACT_TYPE,
    enum: CONTACT_TYPES,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

ContactSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model("contact", ContactSchema);
