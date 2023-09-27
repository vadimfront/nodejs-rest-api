const express = require("express");

const authSchema = require("../../schemas/auth.js");

const { validateBody, authenticate, upload } = require("../../middlewares");
const {
  register,
  login,
  getCurrent,
  logout,
  updSubscription,
  updateAvatar,
  verify,
  resendVerifyEmail,
} = require("../../controllers/users/index.js");
const authRouter = express.Router();

const userSignupValidate = validateBody(authSchema.userSignupSchema);
const userSigninValidate = validateBody(authSchema.userSigninSchema);
const userSubscriptionValidate = validateBody(authSchema.updSubscriptionSchema);
const userEmailValidate = validateBody(authSchema.userEmailSchema);

authRouter.post("/register", userSignupValidate, register);
authRouter.get("/verify/:verificationCode", verify);
authRouter.post("/verify", userEmailValidate, resendVerifyEmail);
authRouter.post("/login", userSigninValidate, login);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/current", authenticate, getCurrent);
authRouter.patch("/", authenticate, userSubscriptionValidate, updSubscription);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  updateAvatar
);

module.exports = authRouter;
