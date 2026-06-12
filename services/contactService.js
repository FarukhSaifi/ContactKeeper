const Contact = require("../models/Contact");
const { MESSAGES } = require("../constants");

const findByUser = (userId) => Contact.find({ user: userId }).sort({ date: -1 });

const createForUser = (userId, data) =>
  Contact.create({
    user: userId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    type: data.type,
  });

const updateForUser = async (userId, contactId, fields) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    const error = new Error(MESSAGES.CONTACT.NOT_FOUND);
    error.status = 404;
    throw error;
  }

  if (contact.user.toString() !== userId) {
    const error = new Error(MESSAGES.CONTACT.NOT_AUTHORIZED);
    error.status = 401;
    throw error;
  }

  return Contact.findByIdAndUpdate(contactId, { $set: fields }, { new: true, runValidators: true });
};

const deleteForUser = async (userId, contactId) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    const error = new Error(MESSAGES.CONTACT.NOT_FOUND);
    error.status = 404;
    throw error;
  }

  if (contact.user.toString() !== userId) {
    const error = new Error(MESSAGES.CONTACT.NOT_AUTHORIZED);
    error.status = 401;
    throw error;
  }

  await Contact.findByIdAndDelete(contactId);
  return contact;
};

module.exports = {
  findByUser,
  createForUser,
  updateForUser,
  deleteForUser,
};
