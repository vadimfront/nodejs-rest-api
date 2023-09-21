const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { HttpError } = require("../../utils");
const { modelUser } = require("../../models");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await modelUser.User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already exist");
  }
  const hasPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await modelUser.User.create({
    ...req.body,
    password: hasPassword,
    avatarURL,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = register;
