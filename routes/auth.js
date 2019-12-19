const express = require("express");
routes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../modals/User");
//@routes   GET api/auth
//@desc     get Logged in user
//@access   private
routes.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);

    res.status(500).send("Server Error...");
  }
});

//@routes   POST api/auth
//@desc     Auth User & Get Token
//@access   private
routes.post(
  "/",
  [
    check("email", "Invaild User").isEmail(),
    check("password", "Invaild passwords").exists()
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invaild User" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invaild Password" });
      }

      // Send payload by token
      const payload = {
        user: {
          id: user.id
        }
      };
      // JWT
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error...");
    }
  }
);

module.exports = routes;
