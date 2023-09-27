const { ctrlWrapper } = require("../../utils");
const getCurrent = require("./getCurrent");
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const resendVerifyEmail = require("./resendVerifyEmail");
const updSubscription = require("./updSubscription");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");

module.exports = {
  login: ctrlWrapper(login),
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  register: ctrlWrapper(register),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updSubscription: ctrlWrapper(updSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
