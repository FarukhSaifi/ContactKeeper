const userService = require("../services/userService");

const register = async (req, res) => {
  const result = await userService.register(req.body);
  res.status(201).json(result);
};

module.exports = { register };
