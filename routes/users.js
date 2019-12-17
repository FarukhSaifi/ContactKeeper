const express = require("express");
routes = express.Router();
const { check, validationResult } = require("express-validator");

const user = require("../modals/User");
//@routes   POST api/users
//@desc     Register A New User
//@access   public
routes.post(
  "/",
  [
    // username must be an email
    check("name", "Name Is Reqiured")
      .not()
      .isEmpty(),
    // username must be an email
    check("email", "E-mail is reqiured").isEmail(),
    // password must be at least 5 chars long
    check("password", "Enter the Password 6 And more characters").isLength({
      min: 6
    })
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    res.send("passed");
  }
);

module.exports = routes;
