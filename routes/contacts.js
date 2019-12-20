const express = require("express");
routes = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../modals/User");
const Contact = require("../modals/Contacts");

//@routes   GET api/contact
//@desc     Get All Contacts
//@access   private
routes.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//@routes   POST api/contact
//@desc     Create Contact
//@access   private
routes.post(
  "/",
  [
    auth,
    [
      check("name", "Name is Required")
        .not()
        .isEmail()
    ]
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        user: req.user.id,
        name,
        email,
        phone,
        type
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

//@routes   PUT api/contact/.id
//@desc     Update Contact
//@access   private
routes.put("/:id", (req, res) => {
  res.send("Update Contact ");
});

//@routes   DELETE api/contact/.id
//@desc     Delete Contact
//@access   private
routes.delete("/:id", (req, res) => {
  res.send("Delete Contact");
});

module.exports = routes;
