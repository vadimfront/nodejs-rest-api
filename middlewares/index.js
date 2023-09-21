const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const { ctrlWrapper } = require("../utils");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  validateBody,
  isValidId,
  authenticate: ctrlWrapper(authenticate),
  upload,
};
