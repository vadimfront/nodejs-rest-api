const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { HttpError, sendEmail } = require("../../utils");
const { modelUser } = require("../../models");
const { nanoid } = require("nanoid");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await modelUser.User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already exist");
  }
  const hasPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email</>`,
  };

  await sendEmail(verifyEmail);

  const newUser = await modelUser.User.create({
    ...req.body,
    password: hasPassword,
    avatarURL,
    verificationCode,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = register;
