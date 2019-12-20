const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    requried: true
  },
  email: {
    type: String
  },
  phone: {
    type: String,
    requried: true
  },
  type: {
    type: String,
    default: "personal"
  },
  date: {
    type: String,
    default: Date.now
  }
});

module.exports = mongoose.model("contact", ContactSchema);
