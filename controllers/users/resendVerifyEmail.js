const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../utils");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Email has already been verified");
  }
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click to verify email</>`,
  };
  await sendEmail(verifyEmail);
  res.json({
    message: "Verify email resend success",
  });
};

module.exports = resendVerifyEmail;
