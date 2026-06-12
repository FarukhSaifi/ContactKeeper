const authService = require("../services/authService");
const { MESSAGES } = require("../constants");

const getCurrentUser = async (req, res) => {
  const user = await authService.findUserById(req.user.id);

  if (!user) {
    return res.status(404).json({ msg: MESSAGES.AUTH.USER_NOT_FOUND });
  }

  res.json(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.json(result);
};

module.exports = {
  getCurrentUser,
  login,
};
