const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const { ctrlWrapper } = require("../utils");
const authenticate = require("./authenticate");

module.exports = {
  validateBody,
  isValidId,
  authenticate: ctrlWrapper(authenticate),
};
