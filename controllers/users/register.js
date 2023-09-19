const bcrypt = require("bcrypt");
const { ctrlWrapper, HttpError } = require("../../utils");
const { modelUser } = require("../../models");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await modelUser.User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already exist");
  }
  const hasPassword = await bcrypt.hash(password, 10);
  const newUser = await modelUser.User.create({
    ...req.body,
    password: hasPassword,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = register;
