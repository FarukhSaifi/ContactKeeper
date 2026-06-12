const contactService = require("../services/contactService");
const { MESSAGES } = require("../constants");

const getContacts = async (req, res) => {
  const contacts = await contactService.findByUser(req.user.id);
  res.json(contacts);
};

const createContact = async (req, res) => {
  const contact = await contactService.createForUser(req.user.id, req.body);
  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const { name, email, phone, type } = req.body;
  const fields = {};

  if (name !== undefined) fields.name = name;
  if (email !== undefined) fields.email = email;
  if (phone !== undefined) fields.phone = phone;
  if (type !== undefined) fields.type = type;

  const updated = await contactService.updateForUser(req.user.id, req.params.id, fields);
  res.json(updated);
};

const deleteContact = async (req, res) => {
  await contactService.deleteForUser(req.user.id, req.params.id);
  res.json({ msg: MESSAGES.CONTACT.REMOVED });
};

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
