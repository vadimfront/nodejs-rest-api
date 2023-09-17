const express = require("express");

const authSchema = require("../../schemas/auth.js");

const { validateBody, authenticate } = require("../../middlewares");
const {
  register,
  login,
  getCurrent,
  logout,
  updSubscription,
} = require("../../controllers/users/index.js");
const authRouter = express.Router();

const userSignupValidate = validateBody(authSchema.userSignupSchema);
const userSigninValidate = validateBody(authSchema.userSigninSchema);
const userSubscriptionValidate = validateBody(authSchema.updSubscriptionSchema);

authRouter.post("/register", userSignupValidate, register);
authRouter.post("/login", userSigninValidate, login);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/current", authenticate, getCurrent);
authRouter.patch("/", authenticate, userSubscriptionValidate, updSubscription);

module.exports = authRouter;
