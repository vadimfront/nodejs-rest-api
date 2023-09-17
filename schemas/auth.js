const Joi = require("joi");
const constants = require("../constants");

const userSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(constants.emailRegex).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

const userSigninSchema = Joi.object({
  email: Joi.string().pattern(constants.emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const updSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...constants.subscriptions),
});

module.exports = {
  userSignupSchema,
  userSigninSchema,
  updSubscriptionSchema,
};
