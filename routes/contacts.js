const express = require("express");
routes = express.Router();

//@routes   GET api/contact
//@desc     Get All Contacts
//@access   private
routes.get("/", (req, res) => {
  res.send("Get All Contacts");
});

//@routes   POST api/contact
//@desc     Create Contact
//@access   private
routes.post("/", (req, res) => {
  res.send("Add a New Contacts");
});

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
