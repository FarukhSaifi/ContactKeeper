const express = require("express");
routes = express.Router();

//@routes   GET api/auth
//@desc     get Logged in user
//@access   private
routes.get("/", (req, res) => {
  res.send("Get Login User");
});

//@routes   POST api/auth
//@desc     Auth User & Get Token
//@access   private
routes.post("/", (req, res) => {
  res.send("Login USers");
});

module.exports = routes;
