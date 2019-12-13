const express = require("express");
routes = express.Router();

//@routes   POST api/users
//@desc     Register A New User
//@access   public
routes.post("/", (req, res) => {
  res.send("Register A User");
});

module.exports = routes;
