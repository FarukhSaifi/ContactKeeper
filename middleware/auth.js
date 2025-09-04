const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  const authHeader = req.header("Authorization");
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No Token, authorization Denied ⛔️" });
  }

  try {
    const decode = jwt.verify(token, config.get("jwtSecret"));
    req.user = decode.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: " Token is not valid" });
  }
};
