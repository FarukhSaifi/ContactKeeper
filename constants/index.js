const auth = require("./auth");
const contactTypes = require("./contactTypes");
const messages = require("./messages");
const server = require("./server");

module.exports = {
  ...auth,
  ...contactTypes,
  ...server,
  MESSAGES: messages,
};
