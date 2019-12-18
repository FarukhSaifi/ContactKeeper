const express = require("express");
routes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../modals/User");
//@routes   POST api/users
//@desc     Register A New User
//@access   public
routes.post(
  "/",
  [
    // name is not Empty
    check("name", "Name Is Reqiured")
      .not()
      .isEmpty(),
    // Email must be an email
    check("email", "E-mail is reqiured").isEmail(),
    // password must be at least 6 chars long
    check("password", "Enter the Password 6 And more characters").isLength({
      min: 6
    })
  ],

  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User Already Exists" });
      }
      user = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };
      // JWT
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Sever error");
    }
  }
);

module.exports = routes;
