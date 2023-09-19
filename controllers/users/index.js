const { ctrlWrapper } = require("../../utils");
const getCurrent = require("./getCurrent");
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const updSubscription = require("./updSubscription");

module.exports = {
  login: ctrlWrapper(login),
  register: ctrlWrapper(register),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updSubscription: ctrlWrapper(updSubscription),
};
